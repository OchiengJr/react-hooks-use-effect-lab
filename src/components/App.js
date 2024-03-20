import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [score, setScore] = useState(0);
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  // Handle question answered
  function handleQuestionAnswered(correct) {
    const nextQuestionId = currentQuestionId < questions.length ? currentQuestionId + 1 : null;
    setCurrentQuestionId(nextQuestionId);
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
