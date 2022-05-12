import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions

const addCommentRequested = createAction('comments/addCommentRequested')
const removeCommentRequested = createAction('comments/removeCommentRequested')

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (payload) => async (dispatch, getState) => {
  dispatch(addCommentRequested(payload))
  // const comment = {
  //   ...payload,
  //   _id: nanoid(),
  //   created_at: Date.now(),
  //   userId: getCurrentUserId()(getState())
  // }
  try {
    const { content } = await commentService.createComment(payload)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const removeComment = (id) => async (dispatch, getState) => {
  dispatch(removeCommentRequested())

  try {
    const { content } = await commentService.removeComment(id)
    dispatch(commentRemoved(id))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => {
  state.comments.isLoading
}

export default commentsReducer
