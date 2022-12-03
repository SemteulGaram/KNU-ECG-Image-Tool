/** @jsxImportSource @emotion/react */
import { NextPage } from 'next';
import { mdiFolderSearch } from '@mdi/js';
import PageWrapper from 'src/components/common/page-wrapper';
import usePageStateRoute from 'src/hooks/usePageStateRoute';
import FsSelectionArea from 'src/components/fs-selection-area';
import { useAppStore } from 'src/zustand/app';

const NoTarget: NextPage<unknown> = () => {
  usePageStateRoute();
  const isLastPageImageSelection = useAppStore(
    (state) => state.isLastPageImageSelection
  );

  return (
    <PageWrapper>
      <FsSelectionArea
        title="이미지 폴더를 선택해주세요"
        iconSvgPath={mdiFolderSearch}
        triggerIntroAnimation={isLastPageImageSelection}
      />
    </PageWrapper>
  );
};

export default NoTarget;
