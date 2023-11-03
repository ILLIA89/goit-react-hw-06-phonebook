import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  reducers: {
    addContactOnStore(state, action) {
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContactOnStore(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContactOnStore, deleteContactOnStore, updateFilter } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
