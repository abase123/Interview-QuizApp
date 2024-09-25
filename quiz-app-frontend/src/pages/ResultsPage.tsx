import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Quiz } from '../domain/Quiz';
import { QuizResult } from '../domain/QuizResult';
import '../styles/ResultsPage.css';
import ResultQuestionComponent from "../components/ResultQuestionComp";

const ResultsPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const quiz = location.state?.quiz as Quiz | undefined;
    const result = location.state?.result as QuizResult | undefined;

    if (!quiz || !result) {
        return (
            <div className="results-page-container">
                <h1 className="results-header">Quiz Results</h1>
                <p>No results available.</p>
                <button onClick={() => navigate('/')} className="back-button">Go Back to Home</button>
            </div>
        );
    }

    return (
        <div className="results-page-container">
            <h1 className="results-header">Quiz Results</h1>
            <p>Score: {result.score} out of {result.numbQuestion}</p>

            {quiz.questions.map((question) => (
                <ResultQuestionComponent
                    key={question.id}
                    question={question}
                    userAnswerId={result.userAnswers[question.id]}
                    correctAnswerId={result.correctAnswers[question.id]}
                />
            ))}

            <button onClick={() => navigate('/')} className="back-button">Go Back to Home</button>
        </div>
    );
};

export default ResultsPage;
