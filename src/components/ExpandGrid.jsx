import { Grid, styled } from '@mui/material';

const ExpandGrid = styled(Grid)(() => ({
  animation: 'expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
}));

export default ExpandGrid;
