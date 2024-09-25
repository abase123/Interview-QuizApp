
import React from 'react';
import ResultOptionComponent from './ResultOptionComp.tsx';
import {Question} from "../domain/Question.ts";

interface ResultQuestionProps {
    question: Question;
    userAnswerId: number | undefined;
    correctAnswerId: number;
}

const ResultQuestionComponent: React.FC<ResultQuestionProps> = ({ question, userAnswerId, correctAnswerId }) => {
    const isCorrect = userAnswerId === correctAnswerId;

    return (
        <div className="result-container">
            <h3>{question.text}</h3>
            <ResultOptionComponent
                isCorrect={isCorrect}
                userAnswerId={userAnswerId}
                correctAnswerId={correctAnswerId}
                options={question.options}
            />
        </div>
    );
};

export default ResultQuestionComponent;
