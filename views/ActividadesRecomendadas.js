import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import Actividad from '../components/Actividad';
import axios from 'axios';
import useAureos from '../hooks/useAureos';
import Navegacion from '../components/Navegacion';

//TODO: Pensar que más hacer con las actividades, es decir, buscar qué hacer cuando el usuario dé click en el botón de "Comenzar"


const PATOLOGIAS = [
  {
    id: 1,
    nombre: 'Ansiedad',
  },
  {
    id: 2,
    nombre: 'Depresión',
  },
  {
    id: 3,
    nombre: 'Estrés',
  },
  {
    id: 4,
    nombre: 'Problemas de autoestima',
  },
  {
    id: 5,
    nombre: 'Perdida de sentido de la vida',
  },
  {
    id: 6,
    nombre: 'Relaciones',
  }
]

function ActividadesRecomendadas({route, navigation, user = route.usuario, tkn = route.token}) {

  const {usuario, token} = useAureos();
  const [actividades, setActividades] = useState([]);
  const [patologia, setPatologia] = useState({});

  useEffect(()=>{
    buscarRespuestas();
  },[])

  useEffect(()=>{
    if(patologia){
      obtenerActividades();
    }
  },[patologia])


  async function obtenerActividades(){
    if(token){
      const config = {
        headers: {
          "Content-Type": 'application/json',
          authorization: `Bearer ${token}`
        }
      }
  
      try {
        const {data} = await axios.post(`${process.env.API_URL}/actividades`, {categoria: patologia.nombre} , config);
        setActividades(data);
      } catch (error) {
        console.log("Error jejeje: ",error?.response?.data?.msg);
      }
    }
  }
  
  async function buscarRespuestas(){
    const config = {
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios.post(`${process.env.API_URL}/formulario/buscar-patologia`, {idUsuario: usuario._id}, config);
      setPatologia(PATOLOGIAS[data.patologia - 1]);
    } catch (error) {
      console.log("Error jejeje: ", error.response.data.msg);
    }
  }


  return (
    <>
      <View style={styles.contenedor}>
        <View style={styles.header}>
          <Text style={styles.headerHeading}>Actividades</Text>
        </View>
        <Text style={styles.encabezado}>Actividades <Text style={styles.span}>Recomendadas</Text></Text>
        <View style={styles.actividades}>
            <FlatList
              data={actividades}
              keyExtractor={ (actividad) => (actividad._id.toString()) }
              renderItem={ ({item}) => (
                <Actividad actividad={item}/>
              )}
            />
          </View>
      </View>
      <Navegacion visible={true}/>
    </>
  )
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    // marginVertical: 5,
    // marginHorizontal: 20
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: .2
  },
  headerHeading:{
    textAlign: 'center',
    fontWeight: '700',
    margin: 0,
    fontSize: 22
  },
  encabezado: {
    marginVertical: 23,
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 15
  },
  span: {
    color: '#2FB18A'
  },
  actividades:{
    marginHorizontal: 20,
    height: '100%',
  }
});
export default ActividadesRecomendadas
