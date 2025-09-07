import { configureStore, createSlice } from '@reduxjs/toolkit';

const bookAnnouncement = ["Разработка фронтенд-приложений", "You don't know GoF", "Руководитель команды разработки ПО", "Создание программных систем"];

const bookSlice = createSlice({
  name: 'bookAnnouncement',
  initialState: { currentIndex: 0 }, 
  reducers: {
    nextBook(state) {
      state.currentIndex = (state.currentIndex + 1) % bookAnnouncement.length;
    }
  }
});

const { nextBook } = bookSlice.actions;

const store = configureStore({
  reducer: bookSlice.reducer
});

function updateForm() {
  document.getElementById('book').value = bookAnnouncement[store.getState().currentIndex];
}

document.getElementById('next-button').addEventListener('click', () => {
  store.dispatch(nextBook()); 
  updateForm();                 
});

updateForm();