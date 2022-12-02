/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NextPage } from 'next';
import Icon from '@mdi/react';
import { mdiFolderSearch } from '@mdi/js';
import { open } from '@tauri-apps/api/dialog';
import PageWrapper from 'src/components/common/page-wrapper';

const NoTarget: NextPage<unknown> = () => {
  const onClick = () => {
    open({
      title: '사진이 들어있는 폴더를 선택해주세요',
      directory: true,
      recursive: false,
    }).then((result) => {
      console.log(result);
    });
  };

  return (
    <PageWrapper>
      <div
        className="index_no_target relative w-full h-screen p-8 cursor-pointer select-none"
        onClick={onClick}
      >
        <div className="index_no_target__content relative w-full h-full flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100% 100%"
            preserveAspectRatio="none"
            css={css`
              position: absolute;
              top: 0px;
              left: 0px;
              height: 100%;
              width: 100%;
              rect {
                fill: none;
                stroke: gray;
                stroke-width: 8px;
                stroke-dasharray: 20px, 10px;
                stroke-linecap: butt;
                stroke-dashoffset: 0;

                /* https://matthewlein.com/tools/ceaser */
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* easeOutBack */
                .index_no_target:hover & {
                  stroke-dashoffset: 50px;
                }
              }
            `}
          >
            <defs>
              <clipPath id="insideOnly">
                <rect x="0" y="0" width="100%" height="100%" ry="10" />
              </clipPath>
            </defs>
            <rect
              y="0%"
              x="0%"
              height="100%"
              width="100%"
              ry="10"
              vectorEffect="non-scaling-stroke"
              clipPath="url(#insideOnly)"
            />
          </svg>
          <Icon
            path={mdiFolderSearch}
            title="이미지 폴더 선택"
            size={5}
            color="gray"
          />
          {/* title text */}
          <div className="index_no_target__content__title relative mt-4 text-2xl font-bold text-bwgray">
            이미지 폴더를 선택해주세요
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NoTarget;
