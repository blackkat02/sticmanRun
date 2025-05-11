import { useState, useEffect } from 'react';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    try {
      const savedContacts = localStorage.getItem("contacts");
      return savedContacts 
        ? JSON.parse(savedContacts)
        : [];
    } catch (error) {
      console.error("Помилка при читанні з localStorage:", error);
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } catch (error) {
      console.error("Помилка при збереженні в localStorage:", error);
    }
  }, [contacts]);


  // const savedLS = (contacts) => {
  //   localStorage.setItem("contacts", JSON.stringify(contacts));
  // }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDeleteContact = (id) => {
    setContacts(prev => {
      const newContacts = prev.filter(contact => contact.id !== id);
      return newContacts.map((contact, index) => ({
        ...contact,
        id: `id-${index + 1}`
      }));
    });
  };

  const handleAddContact = (newContact) => {
    setContacts(prev => [
      ...prev,
      {
        id: `id-${prev.length + 1}`,
        ...newContact
      }
    ]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <SearchBox 
        initialValues={{ username: '' }}
        onSearch={handleSearch}
      />
      <ContactList 
        contacts={filteredContacts} 
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;