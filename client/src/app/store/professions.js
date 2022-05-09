import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true
    },
    professionsReceived: (state, action) => {
      state.lastFetch = Date.now()
      state.entities = action.payload
      state.isLoading = false
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceived, professionsRequestFailed } =
  actions

function isOutdated(date) {
  return Date.now() - date > 10 * 60 * 1000
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities
  if (!isOutdated(lastFetch)) return
  dispatch(professionsRequested())
  try {
    const { content } = await professionService.fetchAll()
    dispatch(professionsReceived(content))
  } catch (error) {
    dispatch(professionsRequestFailed(error.message))
  }
}
export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) => {
  state.professions.isLoading
}
export const getProfessionById = (professionId) => (state) => {
  if (!state.professions.entities) return null
  for (const profession of state.professions.entities) {
    if (profession._id === professionId) {
      return profession
    }
  }
  return null
}

export default professionsReducer
