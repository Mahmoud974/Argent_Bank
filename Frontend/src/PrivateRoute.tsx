import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from './store/store';


export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.user.token);

  return token ? children : <Navigate to="/login" />;
};


export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.user.token);

  return !token ? children : <Navigate to="/profile" />;
};

