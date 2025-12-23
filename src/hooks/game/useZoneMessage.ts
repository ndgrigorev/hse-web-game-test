import { useState, useEffect, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';
import { useDialog } from '../../contexts/DialogContext';
import type { ZoneMessage } from '../../types';
import { getChapter1Flag } from '../../components/Chapters/Chapter1/flags';

const getFlagByChapter = (chapterId: string, flagName: string): boolean | null => {
  switch (chapterId) {
    case 'chapter1':
      return getChapter1Flag(flagName as any);
    default:
      return null;
  }
};

export const useZoneMessages = (zoneMessages: ZoneMessage[] = []) => {
  const { gameState } = useGame();
  const { showMessage } = useDialog();
  const triggeredZones = useRef<Set<string>>(new Set());
  const [debugInfo, setDebugInfo] = useState<string>('');
  const zoneCheckEnabled = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      zoneCheckEnabled.current = true;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!zoneMessages.length || !zoneCheckEnabled.current) return;

    const characterScreenX = 400;
    const characterWorldX = characterScreenX + gameState.position.x;

    let debugText = "";
    
    zoneMessages.forEach(zoneMessage => {
      const { zone, id, repeat, text, duration = 3000, conditions } = zoneMessage;
      const inZone = characterWorldX >= zone.x_left && characterWorldX <= zone.x_right;
      
      let conditionsMet = true;
      
      if (conditions) {
        Object.entries(conditions).forEach(([chapterId, flags]) => {
          if (flags && typeof flags === 'object') {
            Object.entries(flags).forEach(([flagName, requiredValue]) => {
              const flagValue = getFlagByChapter(chapterId, flagName);
              
              if (flagValue === null) {
                conditionsMet = false;
              } else if (flagValue !== requiredValue) {
                conditionsMet = false;
              }
            });
          }
        });
      }
      
      if (inZone && conditionsMet) {
        const alreadyTriggered = triggeredZones.current.has(id);
        
        if (!alreadyTriggered || repeat) {
          showMessage(text, duration);
          triggeredZones.current.add(id);
        }
      }
    });

    setDebugInfo(debugText);
  }, [gameState.position, zoneMessages, showMessage]);

  const resetZones = () => {
    triggeredZones.current.clear();
  };

  return { resetZones, debugInfo };
};