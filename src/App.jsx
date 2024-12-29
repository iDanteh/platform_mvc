import { useState } from 'react';
import './styles/App.css';
import AppRouter from './routes/AppRoutes.jsx';
import NavBar from './components/NavBar.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <NavBar />}
        <div style={{ flex: 1 }}>
          <AppRouter />
        </div>
      </div>
    </>
  );
}

export default App
