import { createSlice } from '@reduxjs/toolkit';

// Начальный state
const initialState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Экспорируем действия (actions)
export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;

// Экспортируем редюсер для store
export default todoSlice.reducer;
