/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Icon from '@mdi/react';
import {
  IImageFlag,
  ImageFlag,
  ImageFlagData,
  useAppStore,
} from 'src/zustand/app';

export type Props = unknown;
// Toggle flag button list component
const ImageClassificationClasslist: React.FC<Props> = () => {
  const [imageList, index, setImageList] = useAppStore((state) => [
    state.imageList,
    state.index,
    state.setImageList,
  ]);

  const cImageFlags = imageList[index]?.flags || [];

  // Toggle flag button
  const toggleFlag = (flag: IImageFlag) => {
    const extIndex = cImageFlags.indexOf(flag);
    if (extIndex !== -1) {
      cImageFlags.splice(extIndex, 1);
    } else {
      cImageFlags.push(flag);
    }
    // sort flags
    cImageFlags.sort((a, b) => Number(a) - Number(b));

    // Update image list
    setImageList([...imageList]);
  };

  // Reverse keybind to flag
  const keybindToFlag: Record<string, IImageFlag> = {};
  Object.entries(ImageFlagData).forEach(([key, value]) => {
    keybindToFlag[value.keybind] = key as IImageFlag;
  });

  // Keybind event
  React.useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      const flag = keybindToFlag[e.key];
      if (flag) {
        toggleFlag(flag);
      }
    };
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [keybindToFlag, toggleFlag]);

  return (
    <div className="iccl relative w-full h-full flex flex-row justify-center items-center gap-4">
      {ImageFlag.map((flag) => (
        <button
          key={flag}
          className={
            'iccl' +
            (cImageFlags.includes(flag) ? ' iccl--active' : '') +
            ' w-20 h-24 flex flex-col justify-center items-center gap-1 rounded-sm text-sm cursor-pointer'
          }
          title={ImageFlagData[flag].fullname}
          css={css`
            background-color: ${ImageFlagData[flag].color};
            color: ${ImageFlagData[flag].textColor};
            transition: all 0.2s ease-in-out;
            &:hover {
              transform: translateY(-5%);
            }
            &.iccl--active {
              background-color: ${ImageFlagData[flag].highlightColor};
              color: ${ImageFlagData[flag].highlightTextColor};
            }
          `}
          onClick={() => toggleFlag(flag as IImageFlag)}
        >
          <Icon path={ImageFlagData[flag].iconPath} size={2} />
          {`${ImageFlagData[flag].name} (${ImageFlagData[flag].keybind})`}
        </button>
      ))}
    </div>
  );
};

export default ImageClassificationClasslist;
