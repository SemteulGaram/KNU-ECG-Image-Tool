/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NextPage } from 'next';
import PageWrapper from 'src/components/common/page-wrapper';

const ImageClassification: NextPage<unknown> = () => {
  return (
    <PageWrapper>
      <div
        className="image_classification w-full h-full grid"
        css={css`
          grid-template-areas:
            'imglist imglist'
            'preview preview'
            'classlist menu'
            'info info';

          grid-template-columns: 1fr 150px;
          grid-template-rows: 100px 1fr 100px 24px;
        `}
      >
        <div
          className="ic__imglist"
          css={css`
            grid-area: imglist;
            background-color: red;
          `}
        ></div>
        <div
          className="ic__preview"
          css={css`
            grid-area: preview;
            background-color: green;
          `}
        ></div>
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
