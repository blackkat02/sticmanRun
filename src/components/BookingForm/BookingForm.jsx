import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Імпортуємо DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Імпортуємо стилі DatePicker
import styles from './BookingForm.module.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: null, // Змінено на null для DatePicker
    endDate: null,   // Змінено на null для DatePicker
    comment: '', // Змінено на звичайний input
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
    // Очищаємо помилки для дат, якщо вони були
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
    // Перевірка дат для DatePicker
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

  // Min date for date picker should be today
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    return today;
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p> {/* Текст з макета */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${errors.name ? styles.inputError : ''}`}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

        {/* Date Picker для діапазону дат */}
        <div className={`${styles.inputField} ${errors.startDate || errors.endDate ? styles.inputError : ''}`}>
          <DatePicker
            selected={formData.startDate}
            onChange={handleDateChange}
            startDate={formData.startDate}
            endDate={formData.endDate}
            selectsRange
            inline={false} // Показувати як звичайний інпут
            placeholderText="Booking date" // Плейсхолдер як на макеті
            dateFormat="yyyy/MM/dd"
            minDate={getMinDate()} // Мінімальна дата - сьогодні
            className={styles.datePickerInput} // Додатковий клас для стилізації самого інпута
            calendarClassName={styles.datePickerCalendar} // Клас для стилізації календаря
          />
        </div>
        {(errors.startDate || errors.endDate) && <p className={styles.errorMessage}>{errors.startDate || errors.endDate}</p>}


        <input // Змінено з textarea на input type="text" згідно макету
          type="text"
          name="comment"
          placeholder="Comment" // Змінено плейсхолдер згідно макету
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