import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F4E79',
      light: '#2E75B6',
    },
    secondary: {
      main: '#2E75B6',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;