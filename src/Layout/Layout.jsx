import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <div className='md:flex md:min-h-screen'>
      <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='text-white text-4xl font-black text-center'>
          CRM - Clientes
        </h2>
        <nav className='mt-10'>
          <Link
            className={`${
              currentUrl === '/clients' ? 'text-blue-500' : 'text-white'
            } text-2xl block mt-2 hover:text-blue-300`}
            to='/clients'
          >
            Clientes
          </Link>
          <Link
            className={`${
              currentUrl === '/newClient' ? 'text-blue-500' : 'text-white'
            } text-2xl block mt-2 hover:text-blue-300`}
            to='/newClient'
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div className='md:w-3/4 p-10 bg-gray-100 md:h-screen overflow-scroll'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
