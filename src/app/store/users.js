import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'
import userService from '../services/user.service'
import authService from '../services/authService'
import localStorageService from '../services/localstorage.service'
import { createAction } from '@reduxjs/toolkit'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true }
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push = action.payload
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const userCreateFailed = createAction('users/userCreateFailed')

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      )
    } catch (error) {
      dispatch(authRequestFailed(error.message))
    }
  }

function createUser(payload) {
  return async (dispatch) => {
    dispatch(userCreateRequested())
    try {
      const { content } = await userService.create(payload)
      dispatch(userCreated(content))
    } catch (error) {
      dispatch(userCreateFailed(error.message))
    }
  }
}

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFailed(error.message))
  }
}

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId)
  }
}

export const getUsersList = () => (state) => state.users.entities

export default usersReducer
