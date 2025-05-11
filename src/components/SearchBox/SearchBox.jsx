import PropTypes from 'prop-types';
import { useId } from "react";
import { Formik, Form, Field } from "formik";
import styles from './SearchBox.module.css';

const SearchBox = ({ initialValues, onSearch }) => {
  const searchNameFieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      {({ values, handleChange }) => (
        <Form className={styles.searchForm}>
          <div className={styles.formGroup}>
            <label htmlFor={searchNameFieldId} className={styles.label}>
              Find contacts by name
            </label>
            <Field 
              type="text" 
              name="username" 
              id={searchNameFieldId}
              className={styles.input}
              placeholder="Enter name..."
              onChange={(e) => {
                handleChange(e);
                onSearch(e.target.value);
              }}
              value={values.username}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

SearchBox.propTypes = {
  initialValues: PropTypes.shape({
    username: PropTypes.string
  }).isRequired,
  onSearch: PropTypes.func.isRequired
};

export default SearchBox;