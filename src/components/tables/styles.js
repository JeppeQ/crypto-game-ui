import { makeStyles } from '@material-ui/core/styles'

export const styles = makeStyles({
  table: {
    width: '100%',
    backgroundColor: '#1E2530',
    borderLeft: '3px solid rgba(255, 255, 255, 0.1)',
    borderRight: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '2px solid rgba(255, 255, 255, 0.3)',
    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0px 2px 10px rgba(0, 255, 243, 0.2)',
  },
  activeColumn: {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(0, 255, 243, 1), 0 0 20px rgba(0, 255, 243, 1)'
  },
  pageArrow: {
    fontSize: '16px',
    color: '#ffffffb3',
    cursor: 'pointer',
    width: '25px'
  }
});
