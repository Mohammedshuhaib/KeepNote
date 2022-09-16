import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const noteData = JSON.parse(localStorage.getItem("noteData"));

let initialState = {
  noteData: noteData || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = false;
      },
    },
    extraReducers: (builder) => {}
})

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;