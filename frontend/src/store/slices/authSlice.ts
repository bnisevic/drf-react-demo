import { createSlice } from '@reduxjs/toolkit'

const token = sessionStorage.getItem('token')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    username: ''
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      sessionStorage.setItem('token', action.payload)
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    logout: (state) => {
      state.token = null
      state.username = ''
      sessionStorage.clear()
    }
  }
})

export const { setToken, setUsername, logout } = authSlice.actions
export default authSlice.reducer