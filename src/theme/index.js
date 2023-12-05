import { createTheme} from '@mui/material/styles';
import { indigo, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: indigo[600],
    },
  },
});

export default theme;