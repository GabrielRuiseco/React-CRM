import { useEffect, useState } from 'react';
import Client from '../components/Client';
import Spiner from '../components/Spiner';

const Home = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(!loading);
    const getClientsApi = async () => {
      try {
        const url = 'http://localhost:4000/clients';
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setClients(result);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getClientsApi();
  }, []);

  const handleDelete = async (id) => {
    const confirmate = confirm('¿Deseas eliminar este cliente?');
    if (confirmate) {
      try {
        const url = `http://localhost:4000/clients/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
        });
        await response.json;
        const arrayClients = clients.filter((client) => client.id !== id);
        setClients(arrayClients);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return loading ? (
    <Spiner />
  ) : (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>
      {clients.length === 0 ? (
        <p className='mt-3'>
          Agrega un nuevo cliente dando click en Nuevo Cliente
        </p>
      ) : (
        <table className='w-full mt-5 table-auto shadow-md bg-white'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Empresa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <Client
                key={client.id}
                client={client}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Home;
