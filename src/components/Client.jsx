import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Client = ({ client, handleDelete }) => {
  const navigate = useNavigate();

  const { name, company, email, phone, notes, id } = client;
  return (
    <tr className='border-b-2 hover:bg-gray-100'>
      <td className='p-3'>{name}</td>
      <td className='p-3'>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Email:</span>
          {email}
        </p>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Tel:</span>
          {phone}
        </p>
      </td>
      <td className='p-3'>{company}</td>
      <td className='p-3'>
        <button
          type='button'
          className='bg-gray-500 hover:bg-gray-400 w-full block text-white p-2 rounded-md uppercase font-bold text-xs'
          onClick={() => navigate(`/clients/${id}`)}
        >
          Ver
        </button>
        <button
          type='button'
          className='mt-2 bg-blue-500 hover:bg-blue-400 w-full block text-white p-2 rounded-md uppercase font-bold text-xs'
          onClick={() => navigate(`/editClient/${id}`)}
        >
          Editar
        </button>
        <button
          type='button'
          className='mt-2 bg-red-700 hover:bg-red-500 w-full block text-white p-2 uppercase rounded-md font-bold text-xs'
          onClick={()=> handleDelete(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Client;
