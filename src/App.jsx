import { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import styles from './App.module.css';

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedbackData");
    return savedFeedback 
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("feedbackData", JSON.stringify(feedback));
  }, [feedback]);

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const updateFeedback = feedbackType => {
    setFeedback(prevState => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1
    }));
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    });
  };

  return (
    <div className={styles.container}>
      <Description />
      <Options 
        onUpdateFeedback={updateFeedback}
        onResetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;