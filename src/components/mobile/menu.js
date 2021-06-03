import React, { useContext } from 'react';
import { useHistory } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { PlayerContext } from '../../contexts/player'
import { ConnectorContext } from '../../contexts/connector'
import { ellipseAddress } from '../../helpers/utilities'
import metamaskLogo from '../../assets/images/metamask-icon.png'

export default function Menu(props) {
  const classes = useStyles()
  const history = useHistory()
  const player = useContext(PlayerContext)
  const connector = useContext(ConnectorContext)

  return (
    <SwipeableDrawer
      anchor={'top'}
      open={props.open}
      onClose={props.close}
    >
      <Box className={classes.list} onClick={props.close}>
        <List>
          {props.items.map(item => (
            <ListItem button key={item.name} onClick={() => history.push(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={<Box style={{ letterSpacing: '3px', fontSize: '14px', fontWeight: 'bold' }}>{item.name}</Box>} />
            </ListItem>
          ))}
          <ListItem style={{ marginTop: '10px' }}>
            {player.info.id
              ? <Button startIcon={<img src={metamaskLogo} width="21" height="21" alt='metaMaskIcon' />}>
                {ellipseAddress(player.info.id, 4, 4)}
              </Button>
              : <Button onClick={() => connector.setConnectDialog({ show: true, signup: false })} variant='outlined'>
                connect
              </Button>}
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
}

const useStyles = makeStyles({
  list: {
    width: 'auto',
  },
});