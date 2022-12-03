/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import ISwiper, { Virtual, Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  IImageFlag,
  ImageFlag,
  ImageFlagData,
  useAppStore,
} from 'src/zustand/app';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

export type Props = unknown;
const ImageClassificationImglist: React.FC<Props> = () => {
  const [index, imageList, setIndex] = useAppStore((state) => [
    state.index,
    state.imageList,
    state.setIndex,
  ]);
  const [swiper, setSwiper] = React.useState<ISwiper | null>(null);
  const [width, setWidth] = React.useState<number>(700);

  // Swiper index sync
  React.useEffect(() => {
    // is number
    if (swiper && !swiper.destroyed && swiper.activeIndex !== index) {
      swiper.slideTo(index);
    }
  }, [swiper, index]);

  // lazy resize detect
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setWidth(width);
    });
    resizeObserver.observe(document.querySelector('.ic__imglist')!);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // colored dot generator from image flag
  const getDot = (flag: IImageFlag): React.ReactElement | null => {
    if (!ImageFlag.includes(flag)) {
      console.warn(
        `image-classification.imglist> Image flag (${flag}) is not supported.`
      );
      return null;
    }
    return (
      <span
        className="w-2 h-2 ml-1 rounded-full"
        css={css`
          background-color: ${ImageFlagData[flag].highlightColor};
        `}
      ></span>
    );
  };

  return (
    <div className="icil relative w-full h-full">
      <Swiper
        className="icil__swiper relative w-full h-full "
        modules={[Virtual, Navigation, Scrollbar]}
        spaceBetween={4}
        slidesPerView={width / 132}
        slideToClickedSlide
        centerInsufficientSlides
        centeredSlides
        virtual
        navigation
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        css={css`
          --swiper-theme-color: rgba(127, 127, 127, 0.5);
          & .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;

            transition: transform 0.2s ease;
            transform: scale(0.9);
          }
          & .swiper-slide:hover,
          & .swiper-slide-active {
            transform: scale(1);
          }

          & .swiper-scrollbar-drag {
            background: rgba(127, 127, 127, 0.5);
          }

          & .icil__item__footer {
            opacity: 1;
            transition: opacity 0.2s ease;
          }
          & .swiper-slide-active .icil__item__footer {
            opacity: 0;
          }
        `}
      >
        {imageList.map((image, i) => (
          <SwiperSlide key={image.path} virtualIndex={i}>
            <div className="icil__item relative w-32 h-24">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover select-none rounded-md"
                src={convertFileSrc(image.path)}
              />
              <div className="icil__item__footer absolute bottom-0 left-0 w-full h-4 flex flex-row justify-between items-center bg-black bg-opacity-50 text-white text-xs">
                <div className="icil__item__footer__dotcontainer flex items-center justify-center h-full">
                  {image.flags.map((flag) => getDot(flag))}
                </div>
                {image.extention}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageClassificationImglist;
