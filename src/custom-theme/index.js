import { createMuiTheme } from '@material-ui/core/styles';

const theme = (type = 'light') =>
  createMuiTheme({
    palette: {
      primary: {
        main: '#ff7b54',
      },
      secondary: {
        main: '#ffd56b',
      },
      type,
    },
  });

export default theme;
