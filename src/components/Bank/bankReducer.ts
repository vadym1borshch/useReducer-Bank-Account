export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const DELETE_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_IS_OPEN_MODAL = 'SET_IS_OPEN_MODAL'
export const SET_DEPOSIT = 'SET_DEPOSIT'
export const REQUEST_LOAN = 'REQUEST_LOAN'
export const WITHDRAW = 'WITHDRAW'
export const PAY_LOAN = 'PAY_LOAN'
export const SET_ACTION_ACCOUNT = 'SET_ACTION_ACCOUNT'
export const SET_ACTION_LABEL = 'SET_ACTION_LABEL'

export type AccountType = {
  name: string
  password: string
  email: string
  id: string
  balance: number
  loan: number
}

export type StateType = {
  users: AccountType[]
  currentUser: AccountType | null
  isOpenModal: boolean
  action: string | null
  label: string | null
}
export const initState = {
  users: [
    {
      balance: 0,
      loan: 0,
      name: 'vadym',
      id: '5',
      password: 'jhz584dx',
      email: 'vadym@example.com',
    },
  ],
  currentUser: null,
  isOpenModal: false,
  action: null,
  label: null,
}

export const reducer = (
  state: StateType,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case CREATE_ACCOUNT: {
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: action.payload.id,
            name: action.payload.name,
            loan: 0,
            balance: 0,
            password: action.payload.password,
            email: action.payload.email,
          },
        ],
      }
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      }
    }
    case DELETE_ACCOUNT: {
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      }
    }
    case DELETE_CURRENT_USER: {
      return {
        ...state,
        currentUser: null,
      }
    }
    case SET_IS_OPEN_MODAL: {
      return {
        ...state,
        isOpenModal: action.payload,
      }
    }
    case SET_ACTION_ACCOUNT: {
      return {
        ...state,
        action: action.payload,
      }
    }
    case SET_ACTION_LABEL: {
      return {
        ...state,
        label: action.payload,
      }
    }
    case SET_DEPOSIT: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              balance: user.balance + action.payload.value,
            }
          }
          return user
        }),
      }
    }
    case WITHDRAW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              balance: user.balance - action.payload.value,
            }
          }
          return user
        }),
      }
    }
    case REQUEST_LOAN: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              loan: user.loan + action.payload.value,
            }
          }
          return user
        }),
      }
    }
    case PAY_LOAN: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              loan: user.loan - action.payload.value,
            }
          }
          return user
        }),
      }
    }
    default: {
      return state
    }
  }
}
