import React, { createContext, useState, useEffect } from "react"

import { SignupDialog } from '../components/dialogs/signupDialog'
import { AddNameDialog } from "../components/dialogs/addNameDialog"
import * as userApi from "../api/user"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [info, setInfo] = useState({})
  const [signupDialog, showSignupDialog] = useState(false)

  useEffect(() => { 
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await userApi.getMe()
    if (data) {
      setInfo(data)
    }
  }

  return (
    <UserContext.Provider
      value={{
        info,
        getUserInfo,
        showSignupDialog
      }}
    >
      {children}

      <SignupDialog open={signupDialog} close={() => showSignupDialog(false)} />

      {info.id && !info.name && <AddNameDialog open={true} />}

    </UserContext.Provider>
  );
};