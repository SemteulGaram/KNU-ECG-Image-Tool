/** @jsxImportSource @emotion/react */
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { mdiFolderSearch } from '@mdi/js';
import PageWrapper from 'src/components/common/page-wrapper';
import usePageStateRoute from 'src/hooks/usePageStateRoute';
import FsSelectionArea from 'src/components/fs-selection-area';
import { useAppStore } from 'src/zustand/app';
import { isBrowser } from 'src/utils/dom-tool';
import { getTauriModule } from 'src/tauri/lazy-api';
import useGlobalToast from 'src/hooks/useGlobalToast';

const NoTarget: NextPage<unknown> = () => {
  usePageStateRoute();
  const { toastContainer } = useGlobalToast();

  const [base, setBase] = useState<string>('');
  const [isLastPageImageSelection, targetFolder] = useAppStore((state) => [
    state.isLastPageImageSelection,
    state.targetFolder,
  ]);

  // Dynamic import tauri api
  useEffect(() => {
    if (!isBrowser()) return;

    getTauriModule()
      .path.basename(targetFolder)
      .then((base) => {
        setBase(base);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [targetFolder]);

  return (
    <PageWrapper>
      <FsSelectionArea
        title={`${base} 폴더에 사진이 없습니다`}
        iconSvgPath={mdiFolderSearch}
        triggerIntroAnimation={isLastPageImageSelection}
      />
      {toastContainer}
    </PageWrapper>
  );
};

export default NoTarget;
