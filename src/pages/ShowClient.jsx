import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spiner from '../components/Spiner'

const ShowClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setLoading(!loading);
    const getCLientApi = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setTimeout(()=>{
        setLoading(false);
      },1000)
    };
    getCLientApi();
  }, []);
  return (
    <div>
      {loading ? (
        <Spiner />
      ) : Object.keys(client).length === 0 ? (
        <p>No hay resultados</p>
      ) : (
        <>
          <h1 className='font-black text-4xl text-blue-900'>
            Ver Cliente: {client.name}
          </h1>
          <p className='mt-3'>Informacion del cliente</p>
          <p className='text-4xl text-gray-700 mt-10'>
            <span className='uppercase font-bold'>Cliente: </span>
            {client.name}
          </p>
          <p className='text-2xl text-gray-500 mt-4'>
            <span className='text-gray-800 uppercase font-bold'>Email: </span>
            {client.email}
          </p>
          {client.phone && (
            <p className='text-2xl text-gray-500 mt-4'>
              <span className='text-gray-800 uppercase font-bold'>
                Teléfono:{' '}
              </span>
              {client.phone}
            </p>
          )}
          <p className='text-2xl text-gray-500 mt-4'>
            <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
            {client.company}
          </p>
          {client.notes && (
            <p className='text-2xl text-gray-500 mt-4'>
              <span className='text-gray-800 uppercase font-bold'>Notas: </span>
              {client.notes}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ShowClient;
