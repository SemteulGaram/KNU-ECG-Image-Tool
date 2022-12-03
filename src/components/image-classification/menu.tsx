/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { mdiMicrosoftExcel } from '@mdi/js';
import Icon from '@mdi/react';

export type Props = unknown;
const ImageClassificationMenu: React.FC<Props> = () => {
  const saveExcel = () => {
    console.log('saveExcel');
    // TODO: save excel
  };

  // keybind detect
  React.useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      // Ctrl + S or Cmd + S
      if ((e.ctrlKey && e.key === 's') || (e.metaKey && e.key === 's')) {
        e.preventDefault();
        saveExcel();
      }
    };
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  return (
    <div className="icm relative w-full h-full flex flex-col justify-center items-center gap-4">
      <button
        className="icm__btn relative w-28 h-24 flex flex-col justify-center items-center rounded-sm text-sm cursor-pointer"
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
        Export (Cmd + S)
      </button>
    </div>
  );
};

export default ImageClassificationMenu;
