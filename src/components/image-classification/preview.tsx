/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { useAppStore } from 'src/zustand/app';
import { isBrowser } from 'src/utils/dom-tool';

// Single image preview with zoom control via mouse wheel and touch
export type Props = unknown;
const ImageClassificationPreview: React.FC<Props> = () => {
  const [index, imageList] = useAppStore((state) => [
    state.index,
    state.imageList,
  ]);
  const cImage = imageList[index] || {};

  // lazy resize detect
  const [width, setWidth] = React.useState<number>(100);
  const [height, setHeight] = React.useState<number>(100);
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setWidth(width);
      setHeight(height);
    });
    resizeObserver.observe(document.querySelector('.icp')!);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Zoom control
  const [zoom, setZoom] = React.useState<number>(1);
  const [topPx, setTopPx] = React.useState<number>(0);
  const [leftPx, setLeftPx] = React.useState<number>(0);

  // Reset zoom on image change
  React.useEffect(() => {
    setZoom(1);
    setTopPx(0);
    setLeftPx(0);
  }, [index]);

  // Zoom control via mouse wheel anchor center
  const mouseWheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY;
    if (delta > 0) {
      setZoom((prev) => {
        const next = prev * 0.9;
        if (next < 1) {
          return 1;
        }
        return next;
      });
    } else {
      setZoom((prev) => {
        const next = prev * 1.1;
        if (next > 10) {
          return 10;
        }
        return next;
      });
    }
  };

  // Drag event to move image
  const dragStartPoint = React.useRef<{ x: number; y: number } | null>(null);
  const dragHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    // LMB down
    if (e.buttons !== 1) {
      return;
    }

    if (dragStartPoint.current === null) {
      dragStartPoint.current = {
        x: e.pageX,
        y: e.pageY,
      };
    }
    const diffX = e.pageX - dragStartPoint.current.x;
    const diffY = e.pageY - dragStartPoint.current.y;
    setTopPx((prev) => {
      const next = prev + diffY;
      if (next < -height) {
        return -height;
      }
      if (next > height) {
        return height;
      }
      return next;
    });
    setLeftPx((prev) => {
      const next = prev + diffX;
      if (next < -width) {
        return -width;
      }
      if (next > width) {
        return width;
      }
      return next;
    });
    dragStartPoint.current = {
      x: e.pageX,
      y: e.pageY,
    };
    return false;
  };
  const dragEndHandler = () => {
    dragStartPoint.current = null;
  };

  // Zoom control via touch
  const touchStartPoint = React.useRef<{ x: number; y: number } | null>(null);
  const touchZoomRatio = React.useRef<number | null>(null);
  const touchZoomHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      if (touchStartPoint.current === null) {
        touchStartPoint.current = {
          x: (e.touches[0].pageX + e.touches[1].pageX) / 2,
          y: (e.touches[0].pageY + e.touches[1].pageY) / 2,
        };
      }
      if (touchZoomRatio.current === null) {
        const dx = e.touches[0].pageX - e.touches[1].pageX;
        const dy = e.touches[0].pageY - e.touches[1].pageY;
        touchZoomRatio.current = Math.sqrt(dx * dx + dy * dy);
      }
      const dx = e.touches[0].pageX - e.touches[1].pageX;
      const dy = e.touches[0].pageY - e.touches[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const ratio = distance / (touchZoomRatio.current ?? 1);
      setZoom((v) => v * ratio);
      setTopPx((v) => v + (touchStartPoint.current?.y ?? 0) * (1 - ratio));
      setLeftPx((v) => v + (touchStartPoint.current?.x ?? 0) * (1 - ratio));
      touchZoomRatio.current = distance;
    } else {
      touchStartPoint.current = null;
      touchZoomRatio.current = null;
    }
  };

  return (
    <div
      className="icp relative w-full h-full overflow-hidden cursor-move select-none"
      onWheel={mouseWheelHandler}
      onMouseMove={dragHandler}
      onMouseUp={dragEndHandler}
      onMouseLeave={dragEndHandler}
      onTouchMove={touchZoomHandler}
      onTouchEnd={() => {
        touchStartPoint.current = null;
        touchZoomRatio.current = null;
      }}
    >
      <img
        className="w-full h-full object-contain"
        src={isBrowser() ? convertFileSrc(cImage?.path) : ''}
        draggable="false"
        // Zoom control
        css={css`
          transform: translate(${leftPx}px, ${topPx}px) scale(${zoom});
        `}
      />
    </div>
  );
};

export default ImageClassificationPreview;
