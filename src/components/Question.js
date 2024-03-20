import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const { id, prompt, answers, correctIndex } = question;
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    function startTimer() {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => (prevTime === 0 ? 0 : prevTime - 1));
      }, 1000);
      setIntervalId(interval);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        onAnswered(false);
      }, 10000);
      setTimeoutId(timeout);
    }

    startTimer();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [onAnswered, intervalId, timeoutId]);

  function handleAnswer(isCorrect) {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => (
        <button key={answer} onClick={() => handleAnswer(index === correctIndex)}>
          {answer}
        </button>
      ))}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
