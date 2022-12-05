import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppStore } from 'src/zustand/app';

const useGlobalToast = () => {
  const [toastContainer, setToast, setToastContainer] = useAppStore((state) => [
    state.toastContainer,
    state.setToast,
    state.setToastContainer,
  ]);

  // Toast effect
  React.useEffect(() => {
    if (!toastContainer) {
      setToastContainer(
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
      );
      setToast(toast);
    }
  }, [toastContainer]);

  return { toast, toastContainer };
};

export default useGlobalToast;
