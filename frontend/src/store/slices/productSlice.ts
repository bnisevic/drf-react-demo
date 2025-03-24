import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    selected: []
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload
    }
  }
})

export const { setSelected } = productSlice.actions
export default productSlice.reducer