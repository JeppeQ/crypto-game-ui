import React, { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'
import GoogleLogin from 'react-google-login'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import { styles } from './styles'
import Google from '../../assets/images/google-icon.svg'
import logo from '../../assets/images/logo.png'
import { Typography } from '@material-ui/core'
import { UserContext } from '../../contexts/user'
import * as userApi from '../../api/user'

const GoogleButton = withStyles(() => ({
  root: {
    width: '250px',
    justifyContent: 'flex-start',
    padding: '8px 15px'
  },
  startIcon: {
    marginRight: '15px'
  }
}))(Button)

export function SignupDialog(props) {
  const _classes = styles()
  const classes = useStyles()
  const user = useContext(UserContext)

  const [signup, setSignup] = useState(true)

  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')

  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState('')

  useEffect(() => {
    setEmailErr('')
    setPasswordErr('')
  }, [signup])

  const handleEmailChange = (event) => {
    setEmailErr('')
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPasswordErr(false)
    setPassword(event.target.value)
  }

  const validateFields = () => {
    if (email && password) {
      return true
    }

    if (!email) {
      setEmailErr('Indtast email')
    }

    if (!password) {
      setPasswordErr('Adgangskode')
    }
  }

  const createUser = async () => {
    if (!validateFields) {
      return
    }

    const data = await userApi.create(email, password)
    if (data.message) {
      setEmailErr(data.message)
      return
    }

    if (!data.token) {
      return
    }

    user.getUserInfo()
    props.close()
  }

  const login = async () => {
    if (!validateFields) {
      return
    }

    const data = await userApi.login(email, password)

    if (data.message) {
      setEmailErr(data.message)
      return
    }

    if (!data.token) {
      setPasswordErr('Wrong password')
      return
    }

    user.getUserInfo()
    props.close()
  }

  const googleSignup = async (response) => {
    const jwt = await userApi.createGoogle(response)

    if (jwt) {

    }

    props.close()
  }

  return (
    <Dialog open={props.open} onClose={props.close} maxWidth='sm'>
      <Box className={clsx(_classes.dialog, classes.dialog)}>

        <Box mb={2} display='flex'>
          <img src={logo} alt='logo' width='40px' />
          <Box mt={2} pl={1}>
            <Typography variant='h6' style={{ fontSize: '18px' }}>
              Crypto Seasons
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant='h6' style={{ fontSize: '25px' }}>
            Welcome
          </Typography>
        </Box>

        <Box mb={1}>
          <GoogleLogin
            clientId="617834778827-4mkgnrm65p2r63ti2dfp6o6a7i0rm8im.apps.googleusercontent.com"
            render={renderProps => (
              <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} variant='outlined' startIcon={<img src={Google} width="21" height="21" alt='googleIcon' />}>
                {signup ? 'sign up with google' : 'log in with google'}
              </GoogleButton>
            )}
            onSuccess={googleSignup}
            onFailure={() => { }}
            cookiePolicy={'single_host_origin'}
          />
        </Box>

        <Box my={2}>
          <Typography variant='h6'>OR</Typography>
        </Box>

        <TextField
          style={{ marginBottom: '16px' }}
          value={email}
          label={emailErr || "Email"}
          variant="outlined"
          type='email'
          onChange={handleEmailChange}
          fullWidth
          error={emailErr}
          />

        <TextField
          value={password}
          label={passwordErr || "Password"}
          variant="outlined"
          type='password'
          onChange={handlePasswordChange}
          fullWidth
          autoComplete='new-password'
          error={passwordErr}
        />

        {signup
          ? <Box display='flex' alignSelf='flex-end' mb={3} mt={0.5}>
            <Typography style={{ color: 'white' }}>
              Do you already have a user?
            </Typography>
            <Box onClick={() => { setSignup(false) }} ml={0.5} style={{ cursor: 'pointer' }}>
              <Typography color='primary'>Log in</Typography>
            </Box>
          </Box>
          : <Box display='flex' alignSelf='flex-end' mb={3} mt={0.5}>
            <Typography>
              Do not have a user?
            </Typography>
            <Box onClick={() => { setSignup(true) }} ml={0.5} style={{ cursor: 'pointer' }}>
              <Typography color='primary'>Sign up</Typography>
            </Box>
          </Box>}

        <Box alignSelf='flex-end'>

          {signup && <Button variant='contained' color='primary' onClick={createUser}>
            SIGN UP
          </Button>}

          {!signup && <Button variant='contained' color='primary' onClick={login}>
            Log in
          </Button>}

        </Box>
      </Box>
    </Dialog>
  )
}

const useStyles = makeStyles({
  dialog: {
    width: '450px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 40px'
  },
})