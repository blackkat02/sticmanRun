// import { useState, useEffect } from 'react';

import { useState } from 'react';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import contactListData from './contactList.json';
import styles from './App.module.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredContacts = contactListData.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <SearchBox 
        initialValues={{ username: '' }}
        onSearch={handleSearch}
      />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;