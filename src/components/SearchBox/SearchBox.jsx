import PropTypes from 'prop-types';
import { useId } from "react";
import { Formik, Form, Field } from "formik";
import styles from './SearchBox.module.css';

const SearchBox = ({ initialValues, onSearch }) => {
  const nameFieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}} // Empty function to satisfy Formik
    >
      {({ values, handleChange }) => (
        <Form className={styles.searchForm}>
          <div className={styles.formGroup}>
            <label htmlFor={nameFieldId} className={styles.label}>
              Find contacts by name
            </label>
            <Field 
              type="text" 
              name="username" 
              id={nameFieldId}
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