import create from 'zustand';
import { open } from '@tauri-apps/api/dialog';
import { readDir } from '@tauri-apps/api/fs';
import { extensionChecker } from 'src/utils/extension-checker';
import {
  mdiPageFirst,
  mdiPageLast,
  mdiPulse,
  mdiSyncAlert,
  mdiThumbUp,
} from '@mdi/js';

export type IImageFlag = '0' | '1' | '2' | '3' | '4';
export const ImageFlag: IImageFlag[] = [
  '0', // NSR
  '1', // LBBB
  '2', // RBBB
  '3', // AF
  '4', // Acute mi
];
export type IImageFlagData = {
  name: string;
  fullname: string;
  iconPath: string;
  keybind: string;
  color: string;
  textColor: string;
  highlightColor: string;
  highlightTextColor: string;
};
export const ImageFlagData: Record<IImageFlag, IImageFlagData> = {
  0: {
    name: 'NSR',
    fullname: 'Normal Sinus Rhythm',
    iconPath: mdiThumbUp,
    keybind: '1',
    color: '#ff8888',
    textColor: '#000000',
    highlightColor: '#ff4444',
    highlightTextColor: '#ffffff',
  },
  1: {
    name: 'LBBB',
    fullname: 'Left Bundle Branch Block',
    iconPath: mdiPageFirst,
    keybind: '2',
    color: '#ffcc88',
    textColor: '#000000',
    highlightColor: '#ff7744',
    highlightTextColor: '#ffffff',
  },
  2: {
    name: 'RBBB',
    fullname: 'Right Bundle Branch Block',
    iconPath: mdiPageLast,
    keybind: '3',
    color: '#ffff88',
    textColor: '#000000',
    highlightColor: '#cccc22',
    highlightTextColor: '#ffffff',
  },
  3: {
    name: 'AF',
    fullname: 'Atrial Fibrillation',
    iconPath: mdiPulse,
    keybind: '4',
    color: '#88ff88',
    textColor: '#000000',
    highlightColor: '#44cc44',
    highlightTextColor: '#ffffff',
  },
  4: {
    name: 'Acute mi',
    fullname: 'Acute Myocardial Infarction',
    iconPath: mdiSyncAlert,
    keybind: '5',
    color: '#88ccff',
    textColor: '#000000',
    highlightColor: '#4477ff',
    highlightTextColor: '#ffffff',
  },
};

/** Image data for image classification */
export class ImageData {
  /** Absolute path of image */
  path!: string;
  /** Lowercase extension */
  extention!: string;
  flags!: IImageFlag[];
}

export type PageRootState = 'NO_TARGET' | 'NO_IMAGE' | 'LOADED';

export type AppStore = {
  targetFolder: string;
  imageList: ImageData[];
  pageState: PageRootState;
  index: number;
  isLastPageImageSelection: boolean;
  alertKeyboardShortcut: boolean;
  setTargetFolder: (targetFolder: string) => void;
  showTargetFolderSelectDialog: () => void;
  setImageList: (list: ImageData[]) => void;
  setIndex: (index: number) => void;
  canNext: () => boolean;
  next: () => void;
  canPrev: () => boolean;
  prev: () => void;
  setLastPageImageSelection: (isLastPageImageSelection: boolean) => void;
  setAlertKeyboardShortcut: (alertKeyboardShortcut: boolean) => void;
};

const _calculatePageState = (
  targetFolder: string,
  imageList: ImageData[]
): PageRootState => {
  if (targetFolder === '') {
    return 'NO_TARGET';
  }
  if (imageList.length === 0) {
    return 'NO_IMAGE';
  }
  return 'LOADED';
};

export const useAppStore = create<AppStore>((set, get) => ({
  targetFolder: '',
  imageList: [],
  pageState: 'NO_TARGET',
  index: 0,
  isLastPageImageSelection: false,
  alertKeyboardShortcut: false,
  setTargetFolder: (targetFolder) =>
    set({
      targetFolder,
      pageState: _calculatePageState(targetFolder, get().imageList),
    }),
  setImageList: (list) =>
    set({
      imageList: list,
      pageState: _calculatePageState(get().targetFolder, list),
    }),
  showTargetFolderSelectDialog: async () => {
    try {
      const targetFolder = await open({
        title: '사진이 들어있는 폴더를 선택해주세요',
        directory: true,
        recursive: false,
        multiple: false,
      });
      if (!targetFolder || Array.isArray(targetFolder)) {
        return; // cancel, or multiple selection
      }
      // read image list
      const fileEntry = await readDir(targetFolder, {
        recursive: true,
      });
      type CFileEntry = typeof fileEntry[0];
      const fileList: string[] = [];
      const getAllFiles = (list: CFileEntry[]) => {
        for (const entry of list) {
          if (entry.children) {
            getAllFiles(entry.children);
          } else {
            fileList.push(entry.path);
          }
        }
      };
      getAllFiles(fileEntry);
      // TODO: remove . ?
      const imageList = fileList
        .filter(
          extensionChecker.bind(null, [
            '.jpg',
            '.jpeg',
            '.png',
            '.gif',
            '.bmp',
            '.tiff',
          ])
        )
        .map((path) => {
          const imageData = new ImageData();
          imageData.path = path;
          imageData.extention = path.split('.').pop()!.toLowerCase();
          imageData.flags = [];
          return imageData;
        });

      set({
        targetFolder,
        imageList,
        index: 0,
        pageState: _calculatePageState(targetFolder, imageList),
      });
    } catch (err) {
      console.error(err);
    }
  },
  setIndex: (index) => set({ index }),
  canNext: () => {
    const { index, imageList } = get();
    return index < imageList.length - 1;
  },
  next: () =>
    set((state) => {
      if (state.index < state.imageList.length - 1) {
        return { index: state.index + 1 };
      }
      return {};
    }),
  canPrev: () => {
    const { index } = get();
    return index > 0;
  },
  prev: () =>
    set((state) => {
      if (state.index > 0) {
        return { index: state.index - 1 };
      }
      return {};
    }),
  setLastPageImageSelection: (isLastPageImageSelection) =>
    set({ isLastPageImageSelection }),
  setAlertKeyboardShortcut: (alertKeyboardShortcut) =>
    set({ alertKeyboardShortcut }),
}));
