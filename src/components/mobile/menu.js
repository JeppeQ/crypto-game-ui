import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings'

import { PlayerContext } from '../../contexts/player'
import { ConnectorContext } from '../../contexts/connector'
import { ellipseAddress } from '../../helpers/utilities'
import { Settings } from '../settings'

export default function MobileMenu(props) {
  const classes = useStyles()
  const history = useHistory()
  const player = useContext(PlayerContext)
  const connector = useContext(ConnectorContext)
  const anchorRef = React.useRef(null);

  const [settings, openSettings] = useState(false);

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
            {player.info.playerId
              ? <Button endIcon={<SettingsIcon />} onClick={(e) => { e.stopPropagation(); openSettings(true) }} ref={anchorRef}>
                {ellipseAddress(player.info.playerId, 4, 4)}
              </Button>
              : <Button onClick={() => connector.setConnectDialog({ show: true, signup: false })}>
                connect
                </Button>}
          </ListItem>
        </List>
      </Box>
      <Settings anchor={anchorRef.current} open={settings} close={() => openSettings(false)} marginTop={'60px'} />
    </SwipeableDrawer>
  );
}

const useStyles = makeStyles({
  list: {
    width: 'auto',
  },
});