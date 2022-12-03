/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { NextPage } from 'next';
import PageWrapper from 'src/components/common/page-wrapper';
import ImageClassificationImglist from 'src/components/image-classification/imglist';
import usePageStateRoute from 'src/hooks/usePageStateRoute';
import { useAppStore } from 'src/zustand/app';

const ImageClassification: NextPage<unknown> = () => {
  usePageStateRoute();

  const [index, imageList] = useAppStore((state) => [
    state.index,
    state.imageList,
  ]);
  return (
    <PageWrapper>
      <div
        className="image_classification w-full h-full h- grid"
        css={css`
          grid-template-areas:
            'imglist imglist'
            'preview preview'
            'classlist menu'
            'info info';

          grid-template-columns: minmax(0, 1fr) 128px;
          grid-template-rows: 112px minmax(0, 1fr) 112px 24px;
        `}
      >
        <div
          className="ic__imglist"
          css={css`
            grid-area: imglist;
          `}
        >
          <ImageClassificationImglist />
        </div>
        <div
          className="ic__preview"
          css={css`
            grid-area: preview;
            background-color: green;
          `}
        >
          <img
            className="w-full h-full object-contain"
            src={convertFileSrc(imageList[index].path)}
          />
        </div>
        <div
          className="ic__classlist"
          css={css`
            grid-area: classlist;
            background-color: blue;
          `}
        ></div>
        <div
          className="ic__menu"
          css={css`
            grid-area: menu;
            background-color: yellow;
          `}
        ></div>
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
