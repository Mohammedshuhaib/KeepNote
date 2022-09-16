import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteService from './noteService'

const noteData = JSON.parse(localStorage.getItem("noteData"));
const data = localStorage.getItem('updateData')
let initialState = {
  noteData: noteData || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  updateData : data || {}
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

  // update notes

  export const updateNotes = createAsyncThunk(
    "/update",
    async (formData, thunkAPI) => {
      try {
        return await noteService.updateNotes(formData);
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

      updateData: (state, action) => {
        state.updateData = action.payload
        localStorage.setItem('updateData',action.payload)
      }
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
          .addCase(updateNotes.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
          })
          .addCase(updateNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })

    }
})

export const { reset, updateData } = noteSlice.actions;
export default noteSlice.reducer;