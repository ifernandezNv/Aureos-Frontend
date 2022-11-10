
import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import {Alert} from 'react-native';

const AureosContext = createContext();

function AureosProvider({children}) {
    
    const [usuario, setUsuario] = useState({});
    const [token, setToken] = useState('');
    const [actividades, setActividades] = useState([]);
    const [actividadSeleccionada, setActividadSeleccionada] = useState([]);
    const [actividadEditar, setActividadEditar] = useState({});
    const [modal, setModal] = useState(false);
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
            setActividadSeleccionada,
            actividadEditar,
            setActividadEditar,
            modal,
            setModal,
        }}
    >
        {children}
    </AureosContext.Provider>
  )
}

export {AureosProvider}
export default AureosContext