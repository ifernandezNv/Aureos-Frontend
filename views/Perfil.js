import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, Alert, ScrollView, Pressable, SafeAreaView } from 'react-native';
import {Button} from 'react-native-paper';

import useAureos from '../hooks/useAureos';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Wave from '../components/Wave';
import ActividadH from '../components/ActividadH';
import Usuario from '../components/Usuario';
import Navegacion from '../components/Navegacion';
import ModalFormulario from '../components/ModalFormulario';
import axios from 'axios';


function Perfil({navigation}) {
  const {usuario, setUsuario, token, setToken, modal, setModal} = useAureos();
  const [actividades, setActividades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cantidadUsuarios, setCantidadUsuarios] = useState(0);
  const [cargando, setCargando] = useState(false);
  

  useEffect(()=>{
    if(usuario.tipo !== 'usuario'){
      obtenerActividadesCreadas();
    }else{
      obtenerActividadesCompletadas();
    }
  },[usuario])


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

  useEffect(()=>{ 
    let cantidad = 0;
    let usuarios = 0;
    if(actividades.length > 0){
      usuarios = actividades.reduce( (cantidad, actividad) => cantidad + actividad.completadaPor.length , 0 );
      setCantidadUsuarios(usuarios);
    }
    
  },[actividades])

  async function obtenerActividadesCreadas(){
    setCargando(true);
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
      console.log("Desde actividades creadas error:", error?.response.data.msg);
    }
    setCargando(false);
  }

  async function obtenerActividadesCompletadas(){
    setCargando(true);
    const config={
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios(`${process.env.API_URL}/actividades/completadas/${usuario._id}`, config);
      setActividades(data);
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
    setCargando(false);
  }

  async function usuariosAll(){
    setCargando(true);
    const config = {
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios(`${process.env.API_URL}/usuarios/todos`, config);
      const usuariosFiltrados = await data.filter(usuarioState => usuarioState._id !== usuario._id);
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      console.log(error);
    }
    setCargando(true);
  }
  async function obtenerSoloUsuarios(){
    setCargando(true);
    const config = {
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios(`${process.env.API_URL}/usuarios`, config);
      const usuariosFiltrados = await data.filter(usuarioState => usuarioState._id !== usuario._id);
      setUsuarios(usuariosFiltrados);
    } catch (error) {
      console.log(error);
    }
    setCargando(true);
  }

  async function eliminarToken(){
    Alert.alert('Sesión cerrada correctamente');
    await AsyncStorage.removeItem('token');
    setUsuario({});
    setToken('');
    navigation.navigate('Inicio');
  }

  function cerrarSesion(){
    Alert.alert('Alerta', '¿Estas segur@ de cerrar sesión?', [{text: 'Si, cerrar sesión', onPress: ()=>eliminarToken()}, {text: 'No, cancelar'} ]);
  }

  function mostrarModal(){
    setModal(!modal);
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
            <Text>Haz realizado un total de: <Text style={styles.span}>{actividades.length} {actividades.length > 1 ? 'actividades' : 'actividad'}  </Text></Text>
            {actividades.length !== 0 && usuario.tipo !== 'usuario' &&
              <Text>Se han utilizado: <Text style={styles.span}>{cantidadUsuarios} {cantidadUsuarios > 1 ? 'Veces' : 'Vez'}</Text> tus actividades</Text>
            }
            
          </View>
        </View>

          <ScrollView
            horizontal={false}
          >
            <SafeAreaView
              // horizontal={false}
              contentContainerStyle={{width: '100%', height: '100%'}}
            >
              <View style={styles.actividades}>
                {usuario.tipo !== 'usuario' ? (
                  <>
                    <Text style={styles.encabezado}>Actividades <Text style={styles.span}>Creadas</Text></Text>
                    <Pressable style={styles.botonCrear} onPress={ ()=>mostrarModal() }>
                      <Text style={styles.botonCrearTexto}>Crear Actividad</Text>
                    </Pressable>
                  </>
                ) : 
                (
                  <>
                    <Text style={styles.encabezado}>Actividades <Text style={styles.span}>Completadas</Text></Text>
                    {actividades.length === 0 && <Text>No haz completado actividades</Text>}
                  </>
                ) }
                {cargando ? <Text>Cargando....</Text> : (
                  actividades.length === 0 && usuario.tipo !== 'usuario' ? <Text>No haz creado actividades</Text> :(
                    <FlatList
                      data={actividades}
                      keyExtractor={ (actividad) => (actividad._id.toString()) }
                      renderItem={ ({item}) => (
                        <ActividadH actividad={item}/>
                      )}
                      horizontal={true}
                    />
                  )
                )}
              </View>
              <View style={{
                marginHorizontal: 20,
                marginVertical: 30,
              }}>
                {usuario.tipo !== 'usuario' && (
                  <>
                    <Text style={styles.encabezado}>Usuarios <Text style={styles.span}>Registrados</Text></Text>
                    {usuarios.length === 0 ? <Text>Cargando....</Text> :(
                      usuarios.map( usuarioState => <Usuario usuarioState={usuarioState} key={usuario._id}/>)
                      // <FlatList
                      //   data={usuarios}
                      //   keyExtractor={ (usuario) => (usuario._id.toString()) }
                      //   renderItem={ ({item}) => (
                      //     <Usuario usuarioListado={item}/>
                      //   )}
                      // />
                    )}
                  </>
                )} 
              </View>
            </SafeAreaView>
          </ScrollView>
          <ModalFormulario/>
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
    botonCrear: {
      width: '40%',
      padding: 10,
      backgroundColor: '#6DD3B5',
      borderRadius: 5,
      marginBottom: 15,
    },
    botonCrearTexto:{
      color: '#fff',
      fontWeight: '900',
      textAlign: 'center',

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