import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <Login onToggleMode={toggleMode} />
      ) : (
        <Register onToggleMode={toggleMode} />
      )}
    </div>
  );
};

export default Auth;

