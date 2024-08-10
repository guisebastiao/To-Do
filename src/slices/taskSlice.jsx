import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../services/taskService";

const initialState = {
  tasks: null,
  errorTask: false,
  successTask: false,
  loadingTask: false,
}

export const InsertTask = createAsyncThunk(
  "task/insert",
  async (body, thunkAPI) => {
    const data = await taskService.Insert(body);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const SelectTask = createAsyncThunk(
  "task/select",
  async (body, thunkAPI) => {
    const data = await taskService.Select(body);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const UpdateTask = createAsyncThunk(
  "task/update",
  async (body, thunkAPI) => {
    const data = await taskService.Update(body);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    const selectTask = data.filter(task => task.id_task === body.id_task);

    if(selectTask[0].completed){
      const audio = new Audio();
      audio.src = "./sound_completed.mp3";
      audio.play();
    }

    return data;
  }
);

export const DeleteTask = createAsyncThunk(
  "task/delete",
  async (body, thunkAPI) => {
    const data = await taskService.Delete(body);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(InsertTask.pending, (state) => {
        state.loadingTask = true;
        state.errorTask = false;
      })
      .addCase(InsertTask.fulfilled, (state, action) => {
        state.loadingTask = false;
        state.successTask = true;
        state.errorTask = false;
        state.tasks = action.payload;
      })
      .addCase(InsertTask.rejected, (state) => {
        state.loadingTask = false;
        state.errorTask = true;
      })
      .addCase(SelectTask.pending, (state) => {
        state.loadingTask = true;
        state.errorTask = false;
      })
      .addCase(SelectTask.fulfilled, (state, action) => {
        state.loadingTask = false;
        state.successTask = true;
        state.errorTask = false;
        state.tasks = action.payload;
      })
      .addCase(SelectTask.rejected, (state) => {
        state.loadingTask = false;
        state.errorTask = true;
        state.tasks = null;
      })
      .addCase(UpdateTask.pending, (state) => {
        state.loadingTask = true;
        state.errorTask = false;
      })
      .addCase(UpdateTask.fulfilled, (state, action) => {
        state.loadingTask = false;
        state.successTask = true;
        state.errorTask = false;
        state.tasks = action.payload;
      })
      .addCase(UpdateTask.rejected, (state) => {
        state.loadingTask = false;
        state.errorTask = true;
        state.tasks = null;
      })
      .addCase(DeleteTask.pending, (state) => {
        state.loadingTask = true;
        state.errorTask = false;
      })
      .addCase(DeleteTask.fulfilled, (state, action) => {
        state.loadingTask = false;
        state.successTask = true;
        state.errorTask = false;
        state.tasks = action.payload;
      })
      .addCase(DeleteTask.rejected, (state) => {
        state.loadingTask = false;
        state.errorTask = true;
        state.tasks = null;
      })
  },
});

export default taskSlice.reducer;
