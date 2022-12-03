import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppStore } from 'src/zustand/app';

const usePageStateRoute = () => {
  const router = useRouter();
  const [pageState, setLastPageImageSelection] = useAppStore((state) => [
    state.pageState,
    state.setLastPageImageSelection,
  ]);

  useEffect(() => {
    switch (pageState) {
      case 'NO_TARGET':
        router.replace('/no-target');
        break;
      case 'NO_IMAGE':
        router.replace('/no-image');
        break;
      case 'LOADED':
        router.replace('/image-classification');
        break;
    }
  }, [pageState]);

  useEffect(() => {
    if (router.pathname === '/no-target' || router.pathname === '/no-image') {
      setLastPageImageSelection(true);
    } else {
      setLastPageImageSelection(false);
    }
  }, []);
};

export default usePageStateRoute;
