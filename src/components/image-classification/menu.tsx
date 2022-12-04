/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { mdiFolderOpen, mdiMicrosoftExcel } from '@mdi/js';
import Icon from '@mdi/react';
import { useAppStore } from 'src/zustand/app';
import { useImageClassificationStore } from 'src/zustand/image-classification';

export type Props = unknown;
const ImageClassificationMenu: React.FC<Props> = () => {
  const [exportExcel, showTargetFolderSelectDialog] = useAppStore((state) => [
    state.exportExcel,
    state.showTargetFolderSelectDialog,
  ]);
  const [toast] = useImageClassificationStore((state) => [state.toast]);

  const saveExcel = async () => {
    console.log('saveExcel');
    const exportPromise = exportExcel('_summary', 'csv');
    toast?.promise(exportPromise, {
      pending: '저장 중...',
      success: {
        render({ data }) {
          return (
            <>
              다음 위치에 저장되었습니다
              <br />
              {'' + data}
            </>
          );
        },
      },
      error: {
        render({ data }) {
          return (
            <>
              저장에 실패했습니다
              <br />
              {'' + data}
            </>
          );
        },
        autoClose: false,
      },
    });
    console.log('savedExcel');
  };

  const openFolder = () => {
    showTargetFolderSelectDialog();
  };

  // keybind detect
  React.useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      // Ctrl + S or Cmd + S
      if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        e.preventDefault();
        saveExcel();
      }
      // Ctrl + O or Cmd + O
      if ((e.ctrlKey && e.key === 'o') || (e.metaKey && e.key === 'o')) {
        e.preventDefault();
        openFolder();
      }
    };
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <div className="icm relative w-full h-full flex flex-row justify-evenly items-center">
      <button
        className="icm__btn relative w-20 h-24 flex flex-col justify-center items-center rounded-sm text-xs cursor-pointer"
        css={css`
          background-color: #cccccc;
          color: #000000;
          transition: all 0.2s ease-in-out;
          &:hover {
            // cyan color
            background-color: #008888;
            color: #ffffff;
          }
          & > span {
            background-color: transparent;
            color: inherit;
          }
        `}
        onClick={openFolder}
      >
        <Icon path={mdiFolderOpen} size={2} />
        폴더 열기 <p className="text-xs">(Cmd + O)</p>
      </button>
      <button
        className="icm__btn relative w-20 h-24 flex flex-col justify-center items-center rounded-sm text-xs cursor-pointer"
        css={css`
          background-color: #cccccc;
          color: #000000;
          transition: all 0.2s ease-in-out;
          &:hover {
            // excel main green color
            background-color: #00b050;
            color: #ffffff;
          }
          & > span {
            background-color: transparent;
            color: inherit;
          }
        `}
        onClick={saveExcel}
      >
        <Icon path={mdiMicrosoftExcel} size={2} />
        보고서 저장 <p className="text-xs">(Cmd + S)</p>
      </button>
    </div>
  );
};

export default ImageClassificationMenu;
