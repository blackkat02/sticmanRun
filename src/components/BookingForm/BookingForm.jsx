import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: null,
    endDate: null,
    comment: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = ([startDate, endDate]) => {
    setFormData((prev) => ({ ...prev, startDate, endDate }));
    if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: '' }));
    if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Ім\'я є обов\'язковим.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email є обов\'язковим.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введіть коректний Email.';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Дата початку оренди є обов\'язковою.';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'Дата закінчення оренди є обов\'язковою.';
    } else if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'Дата закінчення не може бути раніше дати початку.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Booking form submitted:', formData);
      alert('Ваша заявка на бронювання відправлена!');
      setFormData({
        name: '',
        email: '',
        startDate: null,
        endDate: null,
        comment: '',
      });
      setErrors({});
    } else {
      console.log('Form validation failed:', errors);
      alert('Будь ласка, заповніть всі обов\'язкові поля та виправте помилки.');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name*" // Додано зірочку
          value={formData.name}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${errors.name ? styles.inputError : ''}`}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email*" // Додано зірочку
          value={formData.email}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        {/* Date Picker для діапазону дат */}
        {/* Обгортаємо DatePicker в div, щоб стилізувати його як inputField */}
        <div className={`${styles.inputField} ${styles.datePickerWrapper} ${errors.startDate || errors.endDate ? styles.inputError : ''}`}>
          <DatePicker
            selected={formData.startDate}
            onChange={handleDateChange}
            startDate={formData.startDate}
            endDate={formData.endDate}
            selectsRange
            inline={false}
            placeholderText="Booking date*" // Додано зірочку до плейсхолдера
            dateFormat="yyyy/MM/dd"
            minDate={getMinDate()}
            className={styles.datePickerInput}
            calendarClassName={styles.datePickerCalendar}
          />
        </div>
        {(errors.startDate || errors.endDate) && <p className={styles.errorMessage}>{errors.startDate || errors.endDate}</p>}


        <input
          type="text"
          name="comment"
          placeholder="Comment" // На макеті без зірочки
          value={formData.comment}
          onChange={handleChange}
          className={styles.inputField}
        />

        <button type="submit" className={styles.submitButton}>Send</button>
      </form>
    </div>
  );
};

export default BookingForm;