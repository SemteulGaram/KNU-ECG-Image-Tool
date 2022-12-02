/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { useIndexStore } from '../zustand';
import PageWrapper from '../components/common/page-wrapper';

const Home: NextPage<unknown> = () => {
  const router = useRouter();
  const getPageState = useIndexStore((state) => state.getPageState);

  useEffect(() => {
    switch (getPageState()) {
      case 'NO_TARGET':
        router.replace('/no-target');
        break;
      case 'NO_IMAGE':
        router.replace('/no-image');
        break;
      case 'LOADED':
        router.replace('/loaded');
        break;
    }
  }, [getPageState]);

  return (
    <PageWrapper>
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
};

export default Home;
