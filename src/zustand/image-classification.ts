import React from 'react';
import create from 'zustand';
import { toast as _toast } from 'react-toastify';

export type ImageClassificationStore = {
  toastContainer: React.ReactElement | null;
  toast: typeof _toast | null;
  setToastContainer: (toastContainer: React.ReactElement) => void;
  setToast: (toast: typeof _toast) => void;
};
export const useImageClassificationStore = create<ImageClassificationStore>(
  (set) => ({
    toastContainer: null,
    toast: _toast,
    setToastContainer: (toastContainer) => set({ toastContainer }),
    setToast: (toast) => set({ toast }),
  })
);
