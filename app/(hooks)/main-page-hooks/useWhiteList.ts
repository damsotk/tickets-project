import useUser from '@/contexts/UserContext';

export function useWhiteList() {
  const { user } = useUser();
  return { user };
}
