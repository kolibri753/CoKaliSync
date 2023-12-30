import React from 'react';
import './ScoreComponent.css';

interface ScoreComponentProps {
  score: number;
}

const ScoreComponent: React.FC<ScoreComponentProps> = ({ score }) => {
  return (
    <div className={`score__container ${score >= 0 ? 'positive' : 'negative'}`}>
      <p className="score__value">Score: {score}</p>
    </div>
  );
};

export default ScoreComponent;
