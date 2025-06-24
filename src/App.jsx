import React, { useState } from 'react';
import './App.css';

const App = () => {
  const cards = [
    { question: "Who is known as the 'Father of Computer Science'?", answer: "Alan Turing" },
    { question: "What does 'HTTP' stand for?", answer: "HyperText Transfer Protocol" },
    { question: "What is the time complexity of binary search on a sorted array?", answer: "O(log n)" },
    { question: "Which data structure uses FIFO (First In, First Out) ordering?", answer: "Queue" },
    { question: "In object-oriented programming, what does 'DRY' stand for?", answer: "Don't Repeat Yourself" },
    { question: "What is the primary purpose of the OSI model?", answer: "To standardize network communications into seven layers" },
    { question: "Which algorithm is commonly used to find the shortest path in a weighted graph?", answer: "Dijkstra’s Algorithm" },
    { question: "What is a deadlock in operating systems?", answer: "A situation where two or more processes are unable to proceed because each is waiting for the other to release a resource" },
    { question: "Which database properties does ACID refer to?", answer: "Atomicity, Consistency, Isolation, Durability" },
    { question: "Who invented the World Wide Web?", answer: "Tim Berners-Lee" },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped]     = useState(false);
  const [guess, setGuess]         = useState('');
  const [feedback, setFeedback]   = useState(null); // 'correct' or 'incorrect'

  const { question, answer } = cards[currentIdx];

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const isCorrect = guess.trim().toLowerCase() === answer.trim().toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setFlipped(true);
  };

  const resetState = () => {
    setGuess('');
    setFeedback(null);
    setFlipped(false);
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      resetState();
    }
  };

  const handleNext = () => {
    if (currentIdx < cards.length - 1) {
      setCurrentIdx(currentIdx + 1);
      resetState();
    }
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <h1>The Computer Science Trivia!</h1>
        <p className="subtitle">
          How good of a Computer Scientist are you? Test your CS knowledge here!
        </p>
        <p className="count">Number of cards: {cards.length}</p>
      </header>

      {/* CARD */}
      <div
        className={`card-container ${feedback || ''}`}
        onClick={() => feedback && setFlipped((f) => !f)}
      >
        <div className={`card-inner${flipped ? ' flipped' : ''}`}>
          <div className="card-face front">
            {question}
          </div>
          <div className="card-face back">
            {answer}
          </div>
        </div>
      </div>

      {/* GUESS INPUT */}
      <form className="guess-form" onSubmit={handleGuessSubmit}>
        <label htmlFor="guess-input" className="guess-prompt">
          Write your answer here
        </label>
        <input
          id="guess-input"
          type="text"
          className="guess-input"
          placeholder="Type your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={!!feedback}
        />
        <button type="submit" className="submit-btn" disabled={!guess || !!feedback}>
          Submit
        </button>
      </form>

      {/* FEEDBACK MESSAGE */}
      {feedback === 'correct' && <p className="feedback correct">✅ Correct!</p>}
      {feedback === 'incorrect' && <p className="feedback incorrect">❌ Incorrect!</p>}

      {/* NAVIGATION */}
      <div className="navigation">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={currentIdx === 0 ? 'nav-btn disabled' : 'nav-btn'}
        >
          ◀ Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentIdx === cards.length - 1}
          className={currentIdx === cards.length - 1 ? 'nav-btn disabled' : 'nav-btn'}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default App;
