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
import PersonIcon from '@material-ui/icons/Person'

import { UserContext } from '../../contexts/user'
import { Settings } from '../settings'

export default function MobileMenu(props) {
  const classes = useStyles()
  const history = useHistory()
  const anchorRef = React.useRef(null);

  const [settings, openSettings] = useState(false);
  const user = useContext(UserContext)

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
            {user.info.id
              ? <Button startIcon={<PersonIcon />} onClick={(e) => { e.stopPropagation(); openSettings(true) }} ref={anchorRef}>
                {user.info.name}
              </Button>

              : <Button onClick={() => user.showSignupDialog(true)}>
                signup / login
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