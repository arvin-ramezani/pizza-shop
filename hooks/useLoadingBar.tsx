import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const useLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const onLoaderFinished = () => {
    setProgress(0);
  };

  useEffect(() => {
    setProgress(100);
  }, [router.pathname]);

  return { loading: progress, onLoaderFinished, setLoading: setProgress };
};

export default useLoadingBar;
