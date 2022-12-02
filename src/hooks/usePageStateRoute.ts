import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppStore } from 'src/zustand/app';

const usePageStateRoute = () => {
  const router = useRouter();
  const getPageState = useAppStore((state) => state.getPageState);
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
  }, [getPageState()]);
};

export default usePageStateRoute;
