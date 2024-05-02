import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logowhite.png'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div >
      <header className="bg-custom-blue text-white p-4 h-[10vh]">
        <div className="container mx-auto flex items-center h-full">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={handleNavigateHome}>
            <img src={logo} alt="" />
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 h-[90vh]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
