/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { NextPage } from 'next';
import PageWrapper from 'src/components/common/page-wrapper';
import ImageClassificationImglist from 'src/components/image-classification/imglist';
import usePageStateRoute from 'src/hooks/usePageStateRoute';
import { useAppStore } from 'src/zustand/app';
import ImageClassificationClasslist from 'src/components/image-classification/classlist';
import ImageClassificationMenu from 'src/components/image-classification/menu';

const ImageClassification: NextPage<unknown> = () => {
  usePageStateRoute();
  const [index, imageList, next, prev] = useAppStore((state) => [
    state.index,
    state.imageList,
    state.next,
    state.prev,
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

  return (
    <PageWrapper>
      <div
        className="image_classification w-full h-full h- grid"
        css={css`
          grid-template-areas:
            'preview preview'
            'imglist imglist'
            'classlist menu'
            'info info';

          grid-template-columns: minmax(0, 1fr) 128px;
          grid-template-rows: minmax(0, 1fr) 112px 112px 24px;
        `}
      >
        <div
          className="ic__preview overflow-hidden"
          css={css`
            grid-area: preview;
            /* background-color: rgba(127, 127, 127, 0.5); */
          `}
        >
          <img
            className="w-full h-full object-contain"
            src={convertFileSrc(imageList[index]?.path)}
          />
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
        <div
          className="image_classification__info"
          css={css`
            grid-area: info;
          `}
        >
          이전 이미지(←)&nbsp;&nbsp;&nbsp;&nbsp;다음 이미지(→)
        </div>
      </div>
    </PageWrapper>
  );
};

export default ImageClassification;
