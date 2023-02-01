import React, { FC, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

import { theme } from '@/utils/theme.styled';
import useLoadingBar from '@/hooks/useLoadingBar';

interface CustomLoadingBarProps {
  progress: number;
}

const CustomLoadingBar: FC<CustomLoadingBarProps> = ({ progress }) => {
  const { onLoaderFinished, loading } = useLoadingBar();

  return (
    <LoadingBar
      progress={progress}
      onLoaderFinished={onLoaderFinished}
      color={theme.colors.primary}
      height={4}
    />
  );
};

export default CustomLoadingBar;
