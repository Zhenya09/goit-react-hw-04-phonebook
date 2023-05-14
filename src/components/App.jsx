import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const CONTACTS = 'contacts';

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(CONTACTS);

    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    } else {
      setContacts(initialContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onChangeInput = evt => {
    const { name, value } = evt.currentTarget;

    setFilter(value);
  };

  const addContact = ({ name, number }) => {
    if (contacts.some(value => value.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>

      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>

      <Filter filter={filter} onChangeInput={onChangeInput} />

      <ContactList delContact={deleteContact} contacts={filterContacts()} />
    </div>
  );
}