import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be 50 characters or less")
    .required("Name is required"),
  number: Yup.string()
    .matches(
      /^[0-9-+()\s]+$/,
      "Phone number can only contain numbers, +, -, (, ) and spaces"
    )
    .min(3, "Phone number must be at least 3 characters")
    .max(50, "Phone number must be 50 characters or less")
    .required("Phone number is required"),
});

const ContactForm = ({ onSubmit }) => {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={contactSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor={nameFieldId}>Name</label>
            <Field 
              type="text" 
              name="name" 
              id={nameFieldId}
              className={`${styles.input} ${errors.name && touched.name ? styles.error : ''}`}
            />
            <ErrorMessage name="name" component="div" className={styles.errorMessage} />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor={phoneFieldId}>Phone</label>
            <Field 
              type="tel" 
              name="number" 
              id={phoneFieldId}
              className={`${styles.input} ${errors.number && touched.number ? styles.error : ''}`}
            />
            <ErrorMessage name="number" component="div" className={styles.errorMessage} />
          </div>
          
          <button type="submit" className={styles.button}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;