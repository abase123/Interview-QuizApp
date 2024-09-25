import React, { useState, useEffect, useContext } from 'react';
import { Quiz } from '../domain/Quiz';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizQuestionComp from '../components/QuizQuestionComp.tsx';
import AppContext from '../context/AppContext';
import { QuizSubmission } from '../domain/QuizSubmission';
import { QuizResult } from '../domain/QuizResult';
import '../styles/QuizPage.css';

const QuizPage: React.FC = () => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});

    const location = useLocation();
    const navigate = useNavigate();
    const { limit = 3 } = location.state || {};
    const quizService = useContext(AppContext).quizService;

    const allQuestionsAnswered = quiz?.questions.every(q => answers[q.id] !== undefined);

    useEffect(() => {
        quizService.fetchQuiz(limit)
            .then(data => {
                setQuiz(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error loading quiz:', error);
                setIsLoading(false);
            });
    }, [limit, quizService]);

    const handleAnswerSelect = (questionId: number, optionId: number) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionId
        }));
    };
    const handleSubmit = () => {
        if (!quiz) {
            console.error('Quiz data is not available');
            return;
        }
        const submissionData: QuizSubmission = {
            answers: answers
        };

        quizService.submitQuiz(submissionData)
            .then((result: QuizResult) => {
                navigate('/results', { state: { quiz, result } });
            })
            .catch(error => {
                console.error('Error submitting quiz:', error);
            });
    };

    if (isLoading) return <div>Loading...</div>;
    if (!quiz) return <div>Error loading quiz.</div>

    return (
        <div className="quiz-page-container">
            <h2 className="quiz-header">Quiz</h2>
            {quiz.questions.map((question) => (
                <div key={question.id} className="question-container">
                    <QuizQuestionComp
                        question={question}
                        onAnswerSelect={handleAnswerSelect}
                        selectedOptionId={answers[question.id]}
                    />
                </div>
            ))}
            <button onClick={handleSubmit}
                    className="submit-button"
                    disabled={!allQuestionsAnswered}>
                Submit Quiz
            </button>
        </div>
    );
};

export default QuizPage;
