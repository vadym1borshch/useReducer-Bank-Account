import { FC, useEffect, useReducer, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import {
  accountType,
  CREATE_ACCOUNT,
  DELETE_ACCOUNT,
  initState,
  reducer,
  stateType,
} from './bankReducer'
import { v4 } from 'uuid'

interface IBankAccountProps {}

export const BankAccount: FC<IBankAccountProps> = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const [accountOwner, setAccountOwner] = useState('')
  const [account, setAccount] = useState<accountType | null>(null)

  const findObjectByName = (obj: stateType, name: string) => {
    for (const key in obj) {
      if (obj[key].name === name) {
        return obj[key]
      }
    }
    return null
  }

  const currentAccount = findObjectByName(state, accountOwner)
  const enterAccount = () => {
    if (currentAccount) {
      setAccount(currentAccount)
      return
    }
    dispatch({
      type: CREATE_ACCOUNT,
      payload: { id: v4(), name: accountOwner },
    })
  }
  useEffect(() => {
    findObjectByName(state, accountOwner)
  }, [accountOwner, state])

  useEffect(() => {
    setAccount(currentAccount)
  }, [currentAccount])

  console.log(state)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <h1>useReducer bank account</h1>
      {account ? (
        <h2>Hello {account.name}</h2>
      ) : (
        <TextField
          value={accountOwner}
          label="enter Yor name"
          onChange={(e) => setAccountOwner(e.currentTarget.value)}
        />
      )}
      {!account && (
        <Button onClick={enterAccount}>
          {currentAccount ? 'Enter' : 'Create new account'}
        </Button>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: '10px',
        }}
      >
        <span>bal</span>
        <span>loan</span>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Button>deposit</Button>
        <Button>withdraw</Button>
        <Button>request loan</Button>
        <Button>pay loan</Button>
        <Button
          onClick={() =>
            dispatch({ type: DELETE_ACCOUNT, payload: { id: account?.id } })
          }
        >
          close acc
        </Button>
      </Box>
      {account && <Button>exit</Button>}
    </Box>
  )
}
