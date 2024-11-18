import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { waitTwoSeconds } from '../../utils';

// 비동기 작업: ToDo 추가
export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    try {
      await waitTwoSeconds();
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 비동기 작업: ToDo 삭제
export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    try {
      await waitTwoSeconds();
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 초기 상태
const initialState = {
  list: [], // Todo 리스트
  isLoading: false, // 로딩 상태
  error: null, // 에러 상태
};

// 슬라이스 생성
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 동기 todo 추가
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    // 동기 todo 삭제
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // 작업 시작
      .addCase(__addToDo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // todo 추가 성공
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      // todo 추가 실패
      .addCase(__addToDo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // 작업 시작 (todo 삭제)
      .addCase(__deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // todo 삭제 성공
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })
      // todo 삭제 실패
      .addCase(__deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
