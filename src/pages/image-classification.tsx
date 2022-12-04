/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { NextPage } from 'next';
import { ToastContainer, toast } from 'react-toastify';
import PageWrapper from 'src/components/common/page-wrapper';
import ImageClassificationImglist from 'src/components/image-classification/imglist';
import usePageStateRoute from 'src/hooks/usePageStateRoute';
import { useAppStore } from 'src/zustand/app';
import ImageClassificationClasslist from 'src/components/image-classification/classlist';
import ImageClassificationMenu from 'src/components/image-classification/menu';
import ImageClassificationPreview from 'src/components/image-classification/preview';

import 'react-toastify/dist/ReactToastify.css';

const ImageClassification: NextPage<unknown> = () => {
  usePageStateRoute();
  const [
    imageList,
    next,
    prev,
    alertKeyboardShortcut,
    setAlertKeyboardShortcut,
  ] = useAppStore((state) => [
    state.imageList,
    state.next,
    state.prev,
    state.alertKeyboardShortcut,
    state.setAlertKeyboardShortcut,
  ]);

  // Detect key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageList, next, prev]);

  React.useEffect(() => {
    // One time toast
    if (alertKeyboardShortcut) {
      return;
    }

    // in dev mode, toast might show twice because of react strict mode (see more: https://stackoverflow.com/a/72238236/8274779)
    toast.info(
      <>
        ⌨️ 키보드 단축키 사용 가능:
        <br />
        이전(←) 다음(→) 플래그(숫자키)
      </>,
      {
        bodyStyle: {
          width: '880',
        },
      }
    );
    setAlertKeyboardShortcut(true);
  }, [alertKeyboardShortcut]);

  return (
    <PageWrapper>
      <div
        className="image_classification w-full h-full grid"
        css={css`
          grid-template-areas:
            'preview preview'
            'imglist imglist'
            'classlist menu';

          grid-template-columns: minmax(0, 1fr) 128px;
          grid-template-rows: minmax(0, 1fr) 112px 112px;
        `}
      >
        <div
          className="ic__preview overflow-hidden"
          css={css`
            grid-area: preview;
            /* background-color: rgba(127, 127, 127, 0.5); */
          `}
        >
          <ImageClassificationPreview />
        </div>
        <div
          className="ic__classlist"
          css={css`
            grid-area: classlist;
          `}
        >
          <ImageClassificationClasslist />
        </div>
        <div
          className="ic__imglist"
          css={css`
            grid-area: imglist;
          `}
        >
          <ImageClassificationImglist />
        </div>
        <div
          className="ic__menu"
          css={css`
            grid-area: menu;
          `}
        >
          <ImageClassificationMenu />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </PageWrapper>
  );
};

export default ImageClassification;
