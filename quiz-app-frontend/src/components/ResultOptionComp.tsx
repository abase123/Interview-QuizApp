import React from 'react';
import {Option} from "../domain/Option.ts";


interface ResultOptionProps {
    isCorrect: boolean;
    userAnswerId: number | undefined;
    correctAnswerId: number;
    options: Option[];
}

const ResultOptionComponent: React.FC<ResultOptionProps> = ({ isCorrect, userAnswerId, correctAnswerId, options }) => {
    const userOptionText = options.find(option => option.id === userAnswerId)?.text ?? 'Option not found';
    const correctOptionText = options.find(option => option.id === correctAnswerId)?.text ?? 'Option not found';

    return (
        <div>
            <p>Your Answer: <strong>{userOptionText}</strong></p>
            {isCorrect ? (
                <p className="correct-option">Correct!</p>
            ) : (
                <p className="incorrect-option">
                    Incorrect. The correct answer is: <strong>{correctOptionText}</strong>
                </p>
            )}
        </div>
    );
};

export default ResultOptionComponent;
