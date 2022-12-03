/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { NextPage } from 'next';
import Icon from '@mdi/react';
import { mdiFolderSearch } from '@mdi/js';
import PageWrapper from 'src/components/common/page-wrapper';
import { easeInOutCirc, easeOutBack } from 'src/utils/timing';
import usePageStateRoute from 'src/hooks/usePageStateRoute';
import { useAppStore } from 'src/zustand/app';

const keyframesExpand = keyframes`
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 100%;
    height: 100%;
  }
`;
const keyframesFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const NoTarget: NextPage<unknown> = () => {
  usePageStateRoute();
  const showTargetFolderSelectDialog = useAppStore(
    (state) => state.showTargetFolderSelectDialog
  );

  return (
    <PageWrapper>
      <div
        className="index_no_target relative w-full h-screen p-8 cursor-pointer select-none"
        onClick={showTargetFolderSelectDialog}
      >
        <div className="index_no_target__wrapper relative w-full h-full flex flex-col items-center justify-center">
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

                animation: ${keyframesExpand} 1s ${easeInOutCirc} forwards;
                transition: all 0.5s ${easeOutBack};
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
          <div
            className="index_no_target__content flex flex-col items-center justify-center"
            css={css`
              animation: ${keyframesFadeIn} 1.1s ease-in-out forwards;
            `}
          >
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
      </div>
    </PageWrapper>
  );
};

export default NoTarget;
