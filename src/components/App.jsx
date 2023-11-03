import React from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import {
  addContactOnStore,
  deleteContactOnStore,
  updateFilter,
} from 'redux/contacts';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export function App() {
  const contacts = useSelector(state => state.contactsFilter.contacts);
  const filter = useSelector(state => state.contactsFilter.filter);
  const dispatch = useDispatch();

  const addContact = (name, number) => {
    dispatch(addContactOnStore({ name, number, id: nanoid }));
  };

  const deleteContact = contactId => {
    dispatch(deleteContactOnStore(contactId));
  };

  const handleFilterChange = filter => {
    dispatch(updateFilter(filter));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
