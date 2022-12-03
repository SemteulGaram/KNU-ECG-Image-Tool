import create from 'zustand';
import { open } from '@tauri-apps/api/dialog';
import { readDir } from '@tauri-apps/api/fs';
import { extensionChecker } from 'src/utils/extension-checker';

export type IImageFlag = 'NSR' | 'LBBB' | 'RBBB' | 'AF' | 'Acute mi';
export const ImageFlag: IImageFlag[] = [
  'NSR',
  'LBBB',
  'RBBB',
  'AF',
  'Acute mi',
];
export const ImageFlagColors: Record<IImageFlag, string> = {
  // pastel red
  NSR: '#ff8888',
  // pastel orange
  LBBB: '#ffcc88',
  // pastel yellow
  RBBB: '#ffff88',
  // pastel green
  AF: '#88ff88',
  // pastel blue
  'Acute mi': '#88ccff',
};
export const ImageFlagHighlightColors: Record<IImageFlag, string> = {
  // red
  NSR: '#ff4444',
  // orange
  LBBB: '#ff7744',
  // yellow
  RBBB: '#ffff44',
  // green
  AF: '#44ff44',
  // blue
  'Acute mi': '#4477ff',
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

export type IndexStore = {
  targetFolder: string;
  imageList: string[];
  index: number;
  getPageState: () => PageRootState;
  setTargetFolder: (targetFolder: string) => void;
  showTargetFolderSelectDialog: () => void;
  setImageList: (list: string[]) => void;
  setIndex: (index: number) => void;
  canNext: () => boolean;
  next: () => void;
  canPrev: () => boolean;
  prev: () => void;
};

export const useAppStore = create<IndexStore>((set, get) => ({
  targetFolder: '',
  imageList: [],
  index: 0,
  getPageState: () => {
    if (get().targetFolder === '') {
      return 'NO_TARGET';
    }
    if (get().imageList.length === 0) {
      return 'NO_IMAGE';
    }
    return 'LOADED';
  },
  setTargetFolder: (targetFolder) => set({ targetFolder }),
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
      const imageList = fileList.filter(
        extensionChecker.bind(null, [
          '.jpg',
          '.jpeg',
          '.png',
          '.gif',
          '.bmp',
          '.tiff',
        ])
      );

      set({ targetFolder, imageList, index: 0 });
    } catch (err) {
      console.error(err);
    }
  },
  setImageList: (list) => set({ imageList: list }),
  setIndex: (index) => set({ index }),
  canNext: () => {
    const { index, imageList } = get();
    return index < imageList.length - 1;
  },
  next: () => set((state) => ({ index: state.index + 1 })),
  canPrev: () => {
    const { index } = get();
    return index > 0;
  },
  prev: () => set((state) => ({ index: state.index - 1 })),
}));
