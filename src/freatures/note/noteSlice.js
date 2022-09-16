import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'

const noteData = JSON.parse(localStorage.getItem("noteData"));

let initialState = {
  noteData: noteData || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}
// createnote
export const createNote = createAsyncThunk(
    "/create",
    async (formData, thunkAPI) => {
      try {
        return await noteService.create(formData);
      } catch (err) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
// get notes
  export const getNotes = createAsyncThunk(
    "/get",
    async (formData, thunkAPI) => {
      try {
        return await noteService.getNotes();
      } catch (err) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

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
    extraReducers: (builder) => {
        builder
          .addCase(createNote.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
          })
          .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.noteData = null;
          })
          .addCase(getNotes.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.noteData = action.payload;
          })
          .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.noteData = null;
          })
    }
})

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;