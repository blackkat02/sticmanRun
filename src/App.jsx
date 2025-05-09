// import { useState, useEffect } from 'react';

import ContactList from './components/ContactList/ContactList';
import contactListData from './contactList.json';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactList contacts={contactListData} />
    </div>
  );
};

export default App;