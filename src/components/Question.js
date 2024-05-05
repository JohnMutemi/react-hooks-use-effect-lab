import React, { useEffect, useState } from 'react';

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // Function to decrease the timer
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          // Reset time and notify the parent component that time is up
          setTimeout(() => setTimeRemaining(10), 1000); // Delay to show 0 for a second
          onAnswered(false);
          return 10; // Reset time for the next question
        } else {
          return prevTime - 1; // Decrease time by 1 second
        }
      });
    }, 1000); // Runs every 1 second

    // Cleanup function
    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts or dependencies change
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
