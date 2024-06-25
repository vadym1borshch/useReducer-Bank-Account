import { Dispatch, FC, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import {
  AccountType,
  CREATE_ACCOUNT,
  SET_CURRENT_USER,
} from '../Bank/bankReducer'

import { v4 } from 'uuid'

interface ILoginProps {
  users: AccountType[]
  dispatch: Dispatch<{ type: string; payload?: any }>
}

export const Login: FC<ILoginProps> = ({ users, dispatch }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [dataError, setDataError] = useState<string | null>(null)

  const enterAccountHandler = () => {
    const user = users.find((u) => u.name === name)
    if (user) {
      if (user.password !== password || user.email !== email) {
        setDataError('wrong pass or email')
        return
      }
      dispatch({ type: SET_CURRENT_USER, payload: user })
      setPassword('')
      setEmail('')
      return
    } else {
      setError(
        'User not found. Please register a new account. Would you like to do it now?',
      )
    }
  }

  const registerNewAccountHandler = () => {
    dispatch({
      type: CREATE_ACCOUNT,
      payload: {
        id: v4(),
        name: name,
        loan: 0,
        balance: 0,
        password: password,
        email: email,
      },
    })
    setError(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      {error && <span>{error}</span>}
      {dataError && <span>{dataError}</span>}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TextField
          value={name}
          label="Enter your name"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <TextField
          type="password"
          value={password}
          label="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <TextField
          value={email}
          label="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </Box>

      <Box>
        {error ? (
          <>
            <Button color="secondary" onClick={registerNewAccountHandler}>
              register
            </Button>
            <Button
              color="error"
              onClick={() => {
                setError('')
                setEmail('')
                setPassword('')
                setName('')
              }}
            >
              close
            </Button>
          </>
        ) : (
          <Button color="success" onClick={enterAccountHandler}>
            enter
          </Button>
        )}
      </Box>
    </Box>
  )
}
