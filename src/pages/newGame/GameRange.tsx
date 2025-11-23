import React from 'react';
import { useParams } from 'react-router-dom';

const GameRange: React.FC = () => {
  const { range } = useParams<{ range: string }>();

  return (
    <div>
      <h1>Game Range: {range}</h1>
      <p>Details for game range {range} will be displayed here.</p>
    </div>
  );
};

export default GameRange;
