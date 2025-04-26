import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useNavigation() {
  const navigate = useNavigate();

  const navigateTo = useCallback((path: string) => {
    // Always use replace to prevent history buildup
    navigate(path, { replace: true });
  }, [navigate]);

  return { navigateTo };
}
