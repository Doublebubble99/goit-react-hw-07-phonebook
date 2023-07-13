import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'redux/operations';
const contactsPending = state => {
  state.isLoading = true;
};
const contactsError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: contactsPending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    [fetchContacts.rejected]: contactsError,
    [addContact.pending]: contactsPending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.items = [...state.items, action.payload];
      state.error = null;
    },
    [addContact.rejected]: contactsError,
    [deleteContact.pending]: contactsPending,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.error = null;
    },
    [deleteContact.rejected]: contactsError,
  },
});
export const contactsReducer = contactsSlice.reducer;
