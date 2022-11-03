import React, {useState} from 'react';

import {useActionData, Form} from 'react-router-dom';

import axios from 'axios';


export async function action({request, params}){
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const {password} = datos;
    const {token} = params;
    try {
      const {data} = await axios.post(`http://localhost:4000/api/usuarios/olvide-password/${token}`, {password});
      return {
        msg:data.msg,
        error: false
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      };
    }
    return {};
}



function OlvidePassword() {
    const alerta = useActionData();
    const [password, setPassword] = useState('');

  return (
    <Form 
        method='POST'
    >
      {alerta && (
        alerta?.error ? <p className='bg-red-700 p-4  text-white text-center uppercase font-bold my-5 rounded-lg'> {alerta?.msg} </p> :
          <p className='bg-emerald-700 p-4  text-white text-center uppercase font-bold my-5 rounded-lg'> {alerta?.msg} </p>
        
      )}
      
      <div className=''>
        <label htmlFor='password' className='block uppercase font-semibold text-left'>Nuevo password</label>
        <input type='password' placeholder='Introduce tu nuevo password....' className='p-3 text-gray-600 border-b border-b-emerald-600 w-full my-2' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <input type='submit' value='Cambiar Contraseña' className='w-full p-2 my-4 text-center text-white font-semibold text-xl rounded bg-emerald-700 hover:bg-emerald-800 transition-all cursor-pointer'/>
    </Form>
  )
}

export default OlvidePassword
