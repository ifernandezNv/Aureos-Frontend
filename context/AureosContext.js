
import React, {useState, useEffect, createContext} from 'react';

const AureosContext = createContext();

function AureosProvider({children}) {
    
    const [usuario, setUsuario] = useState({});
    const [token, setToken] = useState('');
    const [actividades, setActividades] = useState([]);
    const [actividadSeleccionada, setActividadSeleccionada] = useState([]);

  return (
    <AureosContext.Provider
        value={{
            usuario,
            setUsuario, 
            token, 
            setToken,
            actividades,
            setActividades,
            actividadSeleccionada, 
            setActividadSeleccionada
        }}
    >
        {children}
    </AureosContext.Provider>
  )
}

export {AureosProvider}
export default AureosContext