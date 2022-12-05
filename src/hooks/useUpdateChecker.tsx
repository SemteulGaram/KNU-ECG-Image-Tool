import React from 'react';
import { useAppStore } from 'src/zustand/app';

const useUpdateChecker = () => {
  const [isUpdateCheckRequested, toast, checkUpdate, doUpdate] = useAppStore(
    (state) => [
      state.isUpdateCheckRequested,
      state.toast,
      state.checkUpdate,
      state.doUpdate,
    ]
  );

  const update = async () => {
    const updatePromise = doUpdate();

    toast?.promise(updatePromise, {
      pending: (
        <>
          업데이터 실행됨.
          <br />
          업데이트 프로그램에서 업데이트를 진행해주세요.
        </>
      ),
      success: {
        render() {
          console.log('Update success');
          return <>업데이트 성공!</>;
        },
      },
      error: {
        render({ data }) {
          console.error('Update failed:', data);
          return (
            <>
              업데이트에 실패했습니다.
              <br />
              {'' + data}
            </>
          );
        },
        autoClose: false,
      },
    });
  };

  React.useEffect(() => {
    if (isUpdateCheckRequested || !toast) return;
    checkUpdate()
      .then((updateInfo) => {
        toast.info(
          <>
            <p>새로운 버전이 있습니다 v{updateInfo.version}</p>
            <pre>{updateInfo.body}</pre>
            <p>
              <button
                className="outline outline-1 outline-gray-500 rounded-sm px-2 py-1 m-1"
                onClick={update}
              >
                📦 업데이트
              </button>
            </p>
          </>,
          {
            autoClose: 10000,
            pauseOnHover: true,
          }
        );
      })
      .catch((e) => {
        console.log('Update check failed', e);
      });
  }, [toast]);
};

export default useUpdateChecker;
