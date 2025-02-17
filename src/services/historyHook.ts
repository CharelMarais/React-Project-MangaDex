// src/hooks/useNavigationHistory.ts
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HistoryEntry {
  path: string;
  state: unknown;
}

export const useNavigationHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyRef = useRef<HistoryEntry[]>([]);

  useEffect(() => {

    if (location.pathname.includes('chapter')) return;

    if (location.pathname === '/') {
      historyRef.current = [];
      return;
    }

    const currentEntry = {
      path: location.pathname,
      state: location.state
    };

    const lastEntry = historyRef.current[historyRef.current.length - 1];
    if (!lastEntry || lastEntry.path !== currentEntry.path) {
      historyRef.current = [...historyRef.current, currentEntry];
    }
  }, [location]);

  const handleBack = () => {
    if (historyRef.current.length > 1) {
      const previousEntry = location.pathname.includes('chapter') ? historyRef.current[historyRef.current.length - 1] : historyRef.current[historyRef.current.length - 2];
      navigate(previousEntry.path, {
        state: previousEntry.state 
      });
      historyRef.current = historyRef.current.slice(0, -1);
    } else {
      navigate('/', { replace: true });
      historyRef.current = [];
    }
  };

  return {
    handleBack,
    canGoBack: historyRef.current.length > 0
  };
};