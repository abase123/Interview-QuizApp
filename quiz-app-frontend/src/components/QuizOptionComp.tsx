import React from 'react';
import { Option as OptionType } from '../domain/Option';

interface OptionProps {
    option: OptionType;
    isSelected: boolean;
    onSelect: () => void;
}

const QuizOptionComp: React.FC<OptionProps> = ({ option, isSelected, onSelect }) => {
    return (
        <label>
            <input
                type="radio"
                value={option.id}
                checked={isSelected}
                onChange={onSelect}
            />
            {option.text}
        </label>
    );
};

export default QuizOptionComp;
