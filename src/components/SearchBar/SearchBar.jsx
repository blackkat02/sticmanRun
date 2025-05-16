import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const searchQuery = form.elements.search.value.trim();
    
    if (searchQuery === "") {
      toast.error('Введіть пошуковий запит!');
      return;
    }

    onSubmit(searchQuery);
    form.reset();
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          aria-label="Search images"
        />
        <button 
          type="submit" 
          className={styles.button}
          aria-label="Submit search"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
