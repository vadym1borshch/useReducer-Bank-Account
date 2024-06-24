export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'

export type accountType = {
  name: string
  id: string
  balance: number
  loan: number
}
export type stateType = {
  [key: string]: accountType
}
export const initState: stateType = {
  '5': {
    balance: 0,
    loan: 0,
    name: 'vadym',
    id: '5',
  },
}

function deleteObjectByKey(obj: stateType, key: string) {
  if (key in obj) {
    delete obj[key]
  }
}

export const reducer = (
  state: stateType,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case CREATE_ACCOUNT: {
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          loan: 0,
          balance: 0,
        },
      }
    }
    case DELETE_ACCOUNT: {
      const { [action.payload.id]: _, ...newData } = state
      return { ...newData }
    }
  }
  return state
}
