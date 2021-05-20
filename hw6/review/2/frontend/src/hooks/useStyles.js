// resource: https://material-ui.com/styles/basics/

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  input: {
    margin: '0 0.2em',
  },
  button: {
    width: '100px',
    marginLeft: '0.6em',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
