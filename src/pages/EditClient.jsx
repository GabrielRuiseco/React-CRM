import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyForm from '../components/MyForm';

const EditClient = () => {
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getCLientApi();
  }, []);

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>
        Utiliza este formulario para editar los datos del cliente
      </p>
      {client?.name ? (
        <MyForm client={client} loading={loading} />
      ) : (
        <p>Cliente ID no valido</p>
      )}
    </>
  );
};

export default EditClient;
