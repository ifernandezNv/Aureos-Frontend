import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, Alert } from 'react-native';
import {Video} from 'expo-av';
import {Button} from 'react-native-paper';

import useAureos from '../hooks/useAureos';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Wave from '../components/Wave';
import ActividadH from '../components/ActividadH';
import Usuario from '../components/Usuario';
import Navegacion from '../components/Navegacion';
import axios from 'axios';


function Perfil({navigation, route}) {
  const {usuario, setUsuario, token, setToken} = useAureos();
  const [actividades, setActividades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(()=>{
    
    async function obtenerActividadesCreadas(){
      const config = {
        headers: {
          "Content-Type": 'application/json',
          authorization: `Bearer ${token}`
        }
      }
      try {
        const {data} = await axios.post(`${process.env.API_URL}/actividades/creadas`, {idUsuario: usuario._id}, config);
        setActividades(data);
      } catch (error) {
        console.log(error?.response);
      }
    }
    if(usuario?.tipo === 'admin' || usuario?.tipo === 'profesional'){
      obtenerActividadesCreadas()
    }

  },[])

  useEffect(()=>{
    if(usuarios.length === 0){
      obtenerUsuarios();
    }
    async function obtenerUsuarios(){
      if(usuario.tipo === 'admin'){
        usuariosAll();
        return
      }
        obtenerSoloUsuarios();
    }
    
  },[])

  async function usuariosAll(){
    const config = {
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios(`${process.env.API_URL}/usuarios/todos`, config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
async function obtenerSoloUsuarios(){
    const config = {
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios(`${process.env.API_URL}/usuarios`, config);
      setUsuarios(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  async function eliminarToken(){
    Alert.alert('Sesión cerrada correctamente');
    await AsyncStorage.removeItem('token');
    setUsuario({});
    setToken('');
    setTimeout(() => {
      navigation.navigate('Inicio');
    }, 3000);
  }

  function cerrarSesion(){
    Alert.alert('Alerta', '¿Estas segur@ de cerrar sesión?', [{text: 'Si, cerrar sesión', onPress: ()=>eliminarToken()}, {text: 'No, cancelar'} ]);
  }

  return (
    <View style={styles.contenedor}>
        <Wave customStyles={styles.svgCurve} />
        <View style={styles.headerContainer}>
          <View style={styles.upperbar}>
            <Text style={styles.headerText}>Perfil</Text>
            <Button
              icon='account-remove-outline'
              style={styles.logout}
              onPress={ () => cerrarSesion() }
            >
            </Button>
          </View>
          <View style={styles.card}>
            <Text style={styles.saludo}>Hola: <Text style={styles.span}>{usuario.nombre}</Text> </Text>
            <Text>Haz realizado un total de: {actividades.length} actividades</Text>
            {actividades.length !== 0 &&
              <Text>Y se obtuvieron los siguientes resultados de la aplicación de las mismas</Text>
            }
            
          </View>
        </View>
        {usuario.tipo === 'admin' || usuario.tipo === 'profesional' && 
          <>
            <View style={styles.actividades}>
              <Text style={styles.encabezado}>Actividades <Text style={styles.span}>Creadas</Text></Text>
              {actividades.length === 0 ? <Text>No haz creado actividades</Text> :(
                <FlatList
                  data={actividades}
                  keyExtractor={ (actividad) => (actividad._id.toString()) }
                  renderItem={ ({item}) => (
                    <ActividadH actividad={item}/>
                  )}
                  horizontal={true}
                />
              )}
            </View>
            <View style={{
              marginHorizontal: 20,
              marginVertical: 30,
            }}>
              <Text style={styles.encabezado}>Usuarios <Text style={styles.span}>Registrados</Text></Text>
              {usuarios.length === 0 ? <Text>Cargando....</Text> :(
                <FlatList
                  data={usuarios}
                  keyExtractor={ (usuario) => (usuario._id.toString()) }
                  renderItem={ ({item}) => (
                    <Usuario usuarioListado={item}/>
                  )}
                />
              )} 
            </View>
          </>
        }
        {/* <Video
            ref={video}
            source={{uri: 'https://res.cloudinary.com/ds6v7rbvr/video/upload/v1666656548/file_oa2o8u.mp4'}}
            useNativeControls
            resizeMode="contain"
            isLooping
            style={styles.video}
        /> */}
      <Navegacion visible={true} usuario={usuario} token={token}/>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    headerHeading:{
      textAlign: 'center',
      fontWeight: '700',
      margin: 0,
      fontSize: 22,
    },
    svgCurve: {
      position: 'absolute',
      width: Dimensions.get('window').width
    },
    upperbar:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    logout:{
      marginTop: 15,
      width: 20,
      height: 30,
      backgroundColor: '#fff',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    saludo: {
      fontSize: 18,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: 35
    },
    encabezado: {
      marginBottom: 10,
      fontSize: 20,
      fontWeight: '700'
    },
    span: {
      color: '#2FB18A',
      fontWeight: '700'
    },
    card: {
      backgroundColor: '#fff',
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    actividades: {
      marginTop: 20,
      marginHorizontal: 10,
      padding: 10,

    },
})

export default Perfil