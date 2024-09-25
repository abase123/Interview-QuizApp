import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState(3);

    const startQuiz = () => {
        navigate('/quiz', { state: { limit } });
    };

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome!</h1>
            </header>
            <div className="homepage-content">
                <label className="slider-label">
                    Number of Questions: {limit}
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="slider"
                    />
                </label>
                <button onClick={startQuiz} className="start-button">
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default HomePage;
