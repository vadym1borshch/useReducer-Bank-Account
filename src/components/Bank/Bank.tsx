import React, { ChangeEvent, Dispatch, FC, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import {
  AccountType,
  DELETE_ACCOUNT,
  DELETE_CURRENT_USER,
  PAY_LOAN,
  REQUEST_LOAN,
  SET_ACTION_ACCOUNT,
  SET_ACTION_LABEL,
  SET_CURRENT_USER,
  SET_DEPOSIT,
  SET_IS_OPEN_MODAL,
  StateType,
  WITHDRAW,
} from './bankReducer'
import { TransitionsModal } from '../Modal/Modal'

interface IBankAccountProps {
  user: AccountType | null
  dispatch: Dispatch<{ type: string; payload?: any }>
  state: StateType
}

export const BankAccount: FC<IBankAccountProps> = ({
  state,
  user,
  dispatch,
}) => {
  const [query, setQuery] = useState('')

  const actionLabel = state.label?.toLowerCase() + ' value'

  const changedUser = (user: AccountType, value: number, action: any) => {
    if (action === SET_DEPOSIT) {
      return { ...user, balance: user.balance + value }
    }
    if (action === WITHDRAW) {
      return { ...user, balance: user.balance - value }
    }
    if (action === REQUEST_LOAN) {
      return { ...user, loan: user.loan + value }
    }
    if (action === PAY_LOAN) {
      return { ...user, loan: user.loan - value }
    }
  }

  const onChangeQueryHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.currentTarget.value.replace(/[^0-9]/g, '')
    setQuery(value)
  }

  const deleteAccountHandler = () => {
    dispatch({ type: DELETE_ACCOUNT, payload: user?.id })
    dispatch({ type: DELETE_CURRENT_USER })
  }

  const closeModalHandler = () => {
    dispatch({ type: SET_IS_OPEN_MODAL, payload: false })
    dispatch({
      type: state.action!,
      payload: { id: user?.id, value: Number(query) },
    })
    dispatch({
      type: SET_CURRENT_USER,
      payload: changedUser(user!, +query, state.action),
    })
    setQuery('')
    dispatch({ type: SET_ACTION_ACCOUNT, payload: null })
    dispatch({ type: SET_ACTION_LABEL, payload: null })
  }
  const targetAccountActions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const action = e.currentTarget.id
    const label = e.currentTarget.textContent
    dispatch({ type: SET_IS_OPEN_MODAL, payload: true })
    dispatch({ type: SET_ACTION_ACCOUNT, payload: action })
    dispatch({ type: SET_ACTION_LABEL, payload: label })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <TransitionsModal
        sx={{ width: 300, gap: 2 }}
        open={state.isOpenModal}
        close={closeModalHandler}
        buttonChildren="Submit"
      >
        <TextField
          fullWidth
          label={state.label && actionLabel}
          value={query}
          onChange={onChangeQueryHandler}
        />
      </TransitionsModal>
      <h2>Hello {user?.name}</h2>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: '10px',
        }}
      >
        <span>Balance: {user?.balance}</span>
        <span>Loan: {user?.loan}</span>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Button id={SET_DEPOSIT} onClick={(e) => targetAccountActions(e)}>
          deposit
        </Button>
        <Button id={WITHDRAW} onClick={(e) => targetAccountActions(e)}>
          withdraw
        </Button>
        <Button id={REQUEST_LOAN} onClick={(e) => targetAccountActions(e)}>
          request loan
        </Button>
        <Button id={PAY_LOAN} onClick={(e) => targetAccountActions(e)}>
          pay loan
        </Button>
        <Button onClick={deleteAccountHandler}>close account</Button>
      </Box>
      <Button onClick={() => dispatch({ type: DELETE_CURRENT_USER })}>
        exit
      </Button>
    </Box>
  )
}
