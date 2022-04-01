import React from 'react';
import { Backdrop, styled } from '@mui/material';
import { useSelector } from 'react-redux';

const Background = styled(Backdrop)(() => ({
  backgroundColor: 'white',
  '& img': {
    animation: 'pulsate-fwd 0.5s ease-in-out infinite both',
    width: '50vw',
    maxWidth: '400px',
  },
}));

export default function Loading() {
  const show = useSelector((state) => state.loading.show);

  return (
    <Background open={show}>
      <img src="/1F32E.svg" alt="loading" width={400} height={400} />
    </Background>
  );
}
