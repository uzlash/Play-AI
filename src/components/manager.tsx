import React, { useEffect, useState } from 'react';

export default function ManagerButton({ onTouchStart, show }) {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    const randomPosition = () => {
      const top = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      const left = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      setPosition({ top: `${top}%`, left: `${left}%` });
    };

    randomPosition();
  }, [show]);

  return (
    <div
      onClick={onTouchStart}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        padding: '10px',
        borderRadius: '50%',
      }}
      className='rounded-full z-50 '
    >
      <img onTouchStart={onTouchStart} src="/manager.svg" alt="Start Manager" width={50} height={50} />
    </div>
  );
}
