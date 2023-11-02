// ///changes
// import { Component } from 'react';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import style from './App.module.css';

export const App = () => {
  // переробити
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddNewContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeFilter = event => {
    setFilter({ filter: event.currentTarget.value });
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();
  const contactsName = contacts.map(contact => contact.name);

  return (
    <div>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddNewContact} contactsName={contactsName} />

      <h2 className={style.title}>Contacts</h2>
      <div className={style.contact_list_container}>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
};
export default App;
