import React, { useEffect, useState } from 'react';
import { useDialog } from '../../contexts/DialogContext';
import './IngameMessage.css';

export const IngameMessage: React.FC = () => {
  const { currentText, isVisible } = useDialog();
  const [shouldRender, setShouldRender] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // если текст еще не рендерится, но нужно
    if (isVisible && currentText) {
      setShouldRender(true);
      setTimeout(() => setIsActive(true), 10); // начало через 10мс
    } else if (shouldRender) { // если нужно рендерить (рендерится)
      setIsActive(false);
      setTimeout(() => setShouldRender(false), 1200);
    }
  }, [isVisible, currentText, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={`ingame-message ${isActive ? 'ingame-message--visible' : ''}`}>
      {currentText}
    </div>
  );
};