/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState, useRef } from 'react';
import Icon from '@mdi/react';
import { easeInOutCirc, easeOutBack } from 'src/utils/timing';
import { useAppStore } from 'src/zustand/app';

export type Props = {
  title: string;
  iconSvgPath: string;
  triggerIntroAnimation?: boolean;
};
export const FsSelectionArea: React.FC<Props> = (props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const refRect = useRef<SVGRectElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const showTargetFolderSelectDialog = useAppStore(
    (state) => state.showTargetFolderSelectDialog
  );

  // Intro animation
  useEffect(() => {
    if (isShow) return;
    if (!refRect.current || !refContent.current) return;
    setIsShow(true); // One time only
    if (props.triggerIntroAnimation) {
      refRect.current.animate(
        [
          {
            width: '0',
            height: '0',
          },
          {
            width: '100%',
            height: '100%',
          },
        ],
        { easing: easeInOutCirc, duration: 1000 }
      );
      const contentAnimate = refContent.current.animate(
        [
          {
            opacity: '0',
          },
          {
            opacity: '1',
          },
        ],
        { easing: 'ease-in-out', duration: 300 }
      );
      contentAnimate.pause();
      setTimeout(() => {
        contentAnimate.play();
      }, 800);
    }
  }, [
    props.triggerIntroAnimation,
    refRect.current,
    refContent.current,
    isShow,
  ]);

  return (
    <div
      className="index_no_target relative w-full h-full p-8 cursor-pointer select-none"
      onClick={showTargetFolderSelectDialog}
    >
      <div className="index_no_target__wrapper relative w-full h-full flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // viewBox="0 0 100% 100%"
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
            ref={refRect}
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
          ref={refContent}
        >
          <Icon
            path={props.iconSvgPath}
            title="이미지 폴더 선택"
            size={5}
            color="gray"
          />
          {/* title text */}
          <div className="index_no_target__content__title relative mt-4 max-w-screen-sm text-2xl text-center font-bold text-bwgray">
            {props.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FsSelectionArea;
