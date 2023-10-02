import React, { useState } from 'react';
import Card from './Card';

function App() {
  const [cards, setCards] = useState([]);

  return (
    <div className='cards__wrapper'>
      
      {cards.map(card => (
        <Card key={card.id} onDelete={() => setCards(prev => prev.filter(c => c.id !== card.id))} />
      ))}
      <button className='button__add' onClick={() => setCards(prev => [...prev, { id: Date.now() }])}>+</button>
    </div>
  );
}

export default App;
