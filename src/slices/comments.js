// uusi lisätty Slice/comments.js, tämä sisältää createSlice ja createAsyncThunk funktiot jotka ovat Redux Toolkitin funktioita.
// createSlice funktio luo uuden slice-olion, joka sisältää reducerit ja action creators. createAsyncThunk funktio luo uuden thunkin, joka käsittelee asynkronisia toimintoja. 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CommentService from '../services/CommentService.js';

//kommentien luonti ja hakeminen
export const createComment = createAsyncThunk(
  'comments/create',
  async ({ tutorialId, text }, { rejectWithValue }) => {
    try {
      const response = await CommentService.create(tutorialId, { text });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//kommentien  hakeminen
export const retrieveComments = createAsyncThunk(
    'comments/retrieve',
    async (tutorialId) => {
      const response = await CommentService.getAll(tutorialId);
      return response;
    }

  );
  

  //slice-olion luonti ja määrittelee reducerit ja action creators
  const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(retrieveComments.fulfilled, (state, action) => {
          console.log("Comments Retrieved:", action.payload); 
          return action.payload; 
        })
        .addCase(createComment.fulfilled, (state, action) => {
          state.push(action.payload); 
          console.log('Updated Comments State:', state);
        });
    },
  });
  
  
  export default commentsSlice.reducer;
  