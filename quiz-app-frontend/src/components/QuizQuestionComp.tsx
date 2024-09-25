import React from 'react';
import { Question as QuestionType } from '../domain/Question';
import QuizOptionComp from './QuizOptionComp.tsx';

interface QuestionProps {
    question: QuestionType;
    onAnswerSelect: (questionId: number, optionId: number) => void;
    selectedOptionId?: number;
}

const QuizQuestionComp: React.FC<QuestionProps> = ({ question, onAnswerSelect, selectedOptionId }) => {
    return (
        <div>
            <h3>{question.text}</h3>
            {question.options.map((option) => (
                <QuizOptionComp
                    key={option.id}
                    option={option}
                    isSelected={selectedOptionId === option.id}
                    onSelect={() => onAnswerSelect(question.id, option.id)}
                />
            ))}
        </div>
    );
};

export default QuizQuestionComp;
