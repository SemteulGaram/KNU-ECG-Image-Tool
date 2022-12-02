/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { useIndexStore } from '../zustand';
import PageWrapper from '../components/common/page-wrapper';

export default function Home() {
  const getPageState = useIndexStore((state) => state.getPageState);
  const rootContent: React.ReactElement = <></>;
  switch (getPageState()) {
    case 'NO_TARGET':
      // TODO: Fill root content
      break;
    case 'NO_IMAGE':
      break;
    case 'LOADED':
      break;
  }
  return (
    <PageWrapper>
      {rootContent}
      <span>So here we go</span>
      <button
        onClick={() => {
          open({
            title: '사진이 들어있는 폴더를 선택해주세요',
            directory: true,
            recursive: false,
          }).then((result) => {
            console.log(result);
          });
        }}
      >
        Test Button
      </button>
    </PageWrapper>
  );
}
