import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

interface DialogContextType {
  showMessage: (text: string, duration?: number, delay?: number) => void;
  currentText: string | null;
  isVisible: boolean;
} // |
//   |
//   V
const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const lastMessageRef = useRef<string>('');

  const showMessage = useCallback((text: string, duration = 3000, delay = 0) => {
    if (text === lastMessageRef.current && isVisible) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const showDelayedMessage = () => {
      setCurrentText(text);
      setIsVisible(true);
      lastMessageRef.current = text;
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, duration);
    };

    if (delay > 0) {
      timeoutRef.current = window.setTimeout(showDelayedMessage, delay);
    } else {
      showDelayedMessage();
    }
  }, [isVisible]);

  return (
    <DialogContext.Provider value={{ showMessage, currentText, isVisible }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => { // даёт доступ к функции ShowMessage("...")
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog - Dialog Context - ошибка');
  }
  return context;
};