import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import {Button} from 'react-native-paper';
import Navegacion from '../components/Navegacion';
import useAureos from '../hooks/useAureos';
import axios from 'axios';

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

const Videos = ({navigation}) => {
    const {actividadesRecomendadas, setActividadesRecomendadas, patologia, token, usuario} = useAureos();
    const [actividades, setActividades] = useState([]);
    const [videos, setVideos] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(()=>{
        if(!patologia.nombre || actividades.length === 0){
            obtenerActividades();
        }
    },[])
    useEffect(()=>{
        if(actividades.length){
            const actividadesVideo = actividades.map(actividad => actividad.contenido ? actividad : null);
            setActividades(actividadesVideo);
        }

    },[])


    async function obtenerActividades(){
        setCargando(true);
        if(token){
          const config = {
            headers: {
              "Content-Type": 'application/json',
              authorization: `Bearer ${token}`
            }
          }
          try {
            const {data} = await axios.post(`${process.env.API_URL}/actividades`, {categoria: patologia.nombre} , config);
            const bandera = await data;
            setActividades(data);
          } catch (error) {
            console.log(error);
            console.log("Error jejeje: ", error?.response?.data?.msg);
          }
        }
        setCargando(false);
    }

    function volver(){
        navigation.goBack();
    }
  return (
    <View style={styles.contenedor}>
        {actividades.length > 0 ? <Text>hola</Text> : (
            <>
            <Image
                style={{
                    width: 250,
                    height: 200,
                }}
                source={{uri: 'https://www.intuitiveaccountant.com/downloads/9043/download/working-on-it.png?cb=287a36a90eae40f6bf55da1fddea7c1e'}}
            />
                <Text>Heeey, Aún no hay videos disponibles de esta categoría</Text>
                <Text>Seguimos trabajando en eso!!!</Text>
                <Pressable onPress={ ()=> volver()}
                    style={styles.boton}
                >
                    <Text style={styles.botonTexto}>Volver</Text>
                </Pressable>
            </>
        )}
        
      <Navegacion visible={true}/>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1, 
        backgroundColor: '#fff', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    boton: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    botonTexto: {
        fontSize: 24,
        fontWeight: '700',
        color: '#6DD3B5',
    }
})

export default Videos