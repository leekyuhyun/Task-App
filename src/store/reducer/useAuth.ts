import { useTypedSelector } from '../../hooks/redux';

export function useAuth() {
  const { id, email } = useTypedSelector((state) => state.user);

  return {
    isAuth: !!email,
    email,
    id,
  };
}
