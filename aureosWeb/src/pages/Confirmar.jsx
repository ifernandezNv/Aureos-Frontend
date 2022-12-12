import React from 'react'
import {useLoaderData} from 'react-router-dom';
import axios from 'axios';
export async function loader({params}){
    const {token} = params;
    try {
        const {data} = await axios(`http://localhost:4000/api/usuarios/confirmar/${token}`);

        return {
            error: false,
            msg: data.msg
        };
    } catch (error) {
      console.log(error);
        return{
            error: true,
            msg: error.response.data.msg
        };
    }
}


function Confirmar() {
    const data = useLoaderData();
  return (
    <div>
      {!data.error ? <p className='p-4 bg-emerald-600 text-white text-center uppercase font-bold'>{data?.msg}</p> : <p className='p-4 bg-red-700 text-white text-center uppercase font-bold'>{data?.msg}</p>}
    </div>
  )
}

export default Confirmar
