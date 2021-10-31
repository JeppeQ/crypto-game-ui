import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button'

export const CustomButton = withStyles(() => ({
  root: {
    padding: '8px 24px'
  }
}))(Button)

export const styles = makeStyles({
  dialog: {
    width: '395px',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRight: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '2px solid rgba(255, 255, 255, 0.3)',
    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0px 2px 10px rgba(0, 255, 243, 0.2)',
    paddingTop: '5px',
    maxWidth: 'calc(100vw - 20px)',
  },
  input: {
    marginBottom: '10px'
  },
  title: {
    color: '#fafafa',
    fontFamily: 'astrospace',
    fontSize: '20px'
  },
  maxButton: {
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'astrospace',
    color: 'rgba(255, 255, 255, 0.5)'
  },
})