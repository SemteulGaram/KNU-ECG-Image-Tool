/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { NextPage } from 'next';
import PageWrapper from 'src/components/common/page-wrapper';
import ImageClassificationImglist from 'src/components/image-classification/imglist';
import usePageStateRoute from 'src/hooks/usePageStateRoute';
import { useAppStore } from 'src/zustand/app';
import ImageClassificationClasslist from 'src/components/image-classification/classlist';
import ImageClassificationMenu from 'src/components/image-classification/menu';
import ImageClassificationPreview from 'src/components/image-classification/preview';
import useGlobalToast from 'src/hooks/useGlobalToast';

const ImageClassification: NextPage<unknown> = () => {
  usePageStateRoute();
  const { toast, toastContainer } = useGlobalToast();
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
    toast?.info(
      <>
        ⌨️ 키보드 단축키 사용 가능:
        <br />
        이전(←) 다음(→) 플래그(숫자키)
      </>
    );
    setAlertKeyboardShortcut(true);
  }, [alertKeyboardShortcut]);

  return (
    <PageWrapper>
      <div
        className="image_classification w-full h-full grid"
        css={css`
          grid-template-areas:
            'preview classlist'
            'imglist menu';

          grid-template-columns: minmax(0, 1fr) 180px;
          grid-template-rows: minmax(0, 1fr) 112px;
        `}
      >
        <div
          className="ic__preview overflow-hidden"
          css={css`
            grid-area: preview;
            background-color: rgba(127, 127, 127, 0.1);
            box-shadow: inset -10px -10px 5px -5px rgba(127, 127, 127, 0.2);
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
            background-color: rgba(127, 127, 127, 0.05);
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
      {toastContainer}
    </PageWrapper>
  );
};

export default ImageClassification;
