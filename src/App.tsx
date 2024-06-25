import React, { useReducer } from 'react'
import { BankAccount } from './components/Bank/Bank'
import { initState, reducer } from './components/Bank/bankReducer'
import { Login } from './components/Login/Login'
import { Box } from '@mui/material'

function App() {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>useReducer bank account</h1>
      {state.currentUser ? (
        <BankAccount state={state} user={state.currentUser} dispatch={dispatch}/>
      ) : (
        <Login users={state.users} dispatch={dispatch} />
      )}
    </Box>
  )
}

export default App
