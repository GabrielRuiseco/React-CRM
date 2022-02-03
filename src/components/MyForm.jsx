import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import Spiner from './Spiner';

const MyForm = ({ client, loading }) => {
  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    company: Yup.string().required('La compañia es obligatoria'),
    email: Yup.string().email().required('El email es obligatorio'),
    phone: Yup.number('Número no valido')
      .integer('Número no valido')
      .typeError('El número no es valido'),
  });
  const handleSubmit = async (values) => {
    try {
      if (!client.id) {
        const url = import.meta.env.VITE_API_URL;
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        console.log(result);
        navigate('/clients');
        return;
      }
      const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      navigate('/clients');
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Spiner />
  ) : (
    <div className='bg-white mt-10 py-10 px-5 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='font-bold text-gray-600 text-xl uppercase text-center'>
        {client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
      </h1>
      <Formik
        initialValues={{
          name: client?.name ?? '',
          company: client?.company ?? '',
          email: client?.email ?? '',
          phone: client?.phone ?? '',
          notes: client?.notes ?? '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => (
          <Form className='mt-10'>
            <div className='mb-4'>
              <label htmlFor='name' className='text-gray-800'>
                Nomre
              </label>
              <Field
                id='name'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Nombre del cliente'
                name='name'
              />
              {errors.name && touched.name ? (
                <Alert>{errors.name}</Alert>
              ) : null}
            </div>
            <div className='mb-4'>
              <label htmlFor='company' className='text-gray-800'>
                Empresa
              </label>
              <Field
                id='company'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Empresa del cliente'
                name='company'
              />
              {errors.company && touched.company ? (
                <Alert>{errors.company}</Alert>
              ) : null}
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='text-gray-800'>
                Email
              </label>
              <Field
                id='email'
                type='email'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Email del cliente'
                name='email'
              />
              {errors.email && touched.email ? (
                <Alert>{errors.email}</Alert>
              ) : null}
            </div>
            <div className='mb-4'>
              <label htmlFor='phome' className='text-gray-800'>
                Teléfono
              </label>
              <Field
                id='phone'
                type='tel'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Teléfono del cliente'
                name='phone'
              />
              {errors.phone && touched.phone ? (
                <Alert>{errors.phone}</Alert>
              ) : null}
            </div>
            <div className='mb-4'>
              <label htmlFor='notes' className='text-gray-800'>
                Notas
              </label>
              <Field
                as='textarea'
                id='notes'
                type='text'
                className='mt-2 block w-full p-3 bg-gray-50'
                placeholder='Notas del cliente'
                name='notes'
              />
            </div>
            <input
              type='submit'
              value={client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
              className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

MyForm.defaultProps = {
  client: {},
  loading: false,
};

export default MyForm;
