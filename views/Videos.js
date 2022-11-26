import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import Actividad from '../components/Actividad';
import Navegacion from '../components/Navegacion';
import useAureos from '../hooks/useAureos';
import {Button} from 'react-native-paper';
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
    const {patologia, setPatologia, token, usuario} = useAureos();
    const [actividades, setActividades] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(()=>{
        if(!patologia.nombre){
          buscarRespuestas();
        }
    },[patologia])

    useEffect(()=>{
        if(patologia.nombre){
            obtenerActividades();
        }
    },[patologia])
    async function buscarRespuestas(){
        setCargando(true);
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
          console.log("Error jejeje: ", error?.response?.data?.msg);
        }
        setCargando(false);
    }

    async function obtenerActividades(){
        setCargando(true);
        if(token && patologia.nombre){
          const config = {
            headers: {
              "Content-Type": 'application/json',
              authorization: `Bearer ${token}`
            }
          }
          try {
            const {data} = await axios.post(`${process.env.API_URL}/actividades`, {categoria: patologia.nombre} , config);
            const actividadesVideo = data.filter(actividad => actividad.contenido && actividad );
            setActividades(actividadesVideo);
          } catch (error) {
            console.log(error);
          }
        }
        setCargando(false);
    }


    function volver(){
        navigation.goBack();
    }

  return (
    <View style={styles.contenedor}>
        {cargando ? <Text>Cargando</Text> : (
              <ScrollView style={{flex: 1, marginHorizontal: 10, marginVertical: 30}}>
                <Button onPress={ ()=>volver()} style={{padding: 10}}>
                  <Text style={{fontSize: 18}}>Volver</Text>
                </Button>
              {actividades.length ? actividades.map(actividad => <Actividad actividad={actividad} key={actividad._id}/>) : (
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
              </ScrollView>
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
        textAlign: 'center'
    }
})

export default Videos