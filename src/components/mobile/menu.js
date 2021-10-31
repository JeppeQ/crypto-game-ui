import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom"

import makeStyles from '@mui/styles/makeStyles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person'

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
              ? <Button
                startIcon={<PersonIcon />}
                onClick={(e) => { e.stopPropagation(); openSettings(true) }}
                ref={anchorRef}
                style={{ textTransform: 'none' }}
              >
                {user.info.name}
              </Button>

              : <Button onClick={() => user.showSignupDialog(true)}>
                signup / login
              </Button>}
          </ListItem>

        </List>
      </Box>

      <Settings anchor={anchorRef.current} open={settings} close={() => openSettings(false)} marginTop={'60px'} />

    </SwipeableDrawer >
  );
}

const useStyles = makeStyles({
  list: {
    width: 'auto',
  },
});