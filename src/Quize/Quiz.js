
import React, { useState } from 'react';
import questions from './Questions';
import './Quiz.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const handleAnswerClick = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = index;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleRetakeQuiz = () => {
        setAnswers(Array(questions.length).fill(null));
        setCurrentQuestion(0);
        setIsSubmitted(false);
    };

    const calculateScore = () => {
        return answers.reduce((score, answer, index) => {
            if (answer === questions[index].answer) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    const handleStartQuiz = () => {
        setHasStarted(true);
    };


    return (
        <div className="quiz-container">
            {!hasStarted ? (
                <div className="welcome-section">
                    <h1>Hoàn thành đủ 10 câu trắc nghiệm hóa cơ bản</h1>
                    <h1>Làm hết 10 câu mới được nộp bài</h1>
                    <h1>Nhấn bắt đầu để tiếp tục</h1>
                    <button onClick={handleStartQuiz}>Bắt đầu</button>
                </div>
            ) : !isSubmitted ? (
                <>
                    <div className="question-section">
                        <h2>Question {currentQuestion + 1}</h2>
                        <p>{questions[currentQuestion].question}</p>
                    </div>
                    <div className="options-section">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                                className={answers[currentQuestion] === index ? 'selected' : ''}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="navigation-buttons">
                        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                            Previous
                        </button>
                        <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
                            Next
                        </button>
                    </div>
                    <div className="submit-button">
                        {answers.every((answer) => answer !== null) && (
                            <button onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </>
            ) : (
                <div className="results-section">
                    <h2>Your Score: {calculateScore()} / {questions.length}</h2>
                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="result-question">
                            <h3>Question {qIndex + 1}</h3>
                            <p>{question.question}</p>
                            <div className="options-section">
                                {question.options.map((option, index) => (
                                    <div key={index} className={`result-option ${index === question.answer ? 'correct' : ''}`}>
                                        {option} {index === answers[qIndex] && (index === question.answer ? '✔️' : '❌')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleRetakeQuiz}>Làm lại bài test</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
