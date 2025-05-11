import { useId } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field 
            type="text" 
            name="name" 
            id={nameFieldId}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor={phoneFieldId}>Phone</label>
          <Field 
            type="tel" 
            name="number" 
            id={phoneFieldId}
            className={styles.input}
            required
          />
        </div>
        
        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;