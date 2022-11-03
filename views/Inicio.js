import React, {useState, useEffect} from 'react'

import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAureos from '../hooks/useAureos';

import axios from 'axios';

import Navegacion from '../components/Navegacion';

function Inicio({navigation, route}) {

    const {usuario, setUsuario, token, setToken} = useAureos();

    useEffect( ()=>{
        async function obtenerToken(){
            const tokenAlmacenado = await AsyncStorage.getItem('token');
            if(tokenAlmacenado){
              setToken(tokenAlmacenado);
              return;
            }
        }
        obtenerToken();
    },[])
  
    useEffect( ()=>{
        async function comprobarToken(){
          const config = {
            headers:{
              "Content-Type": 'application/json',
              authorization: `Bearer ${token}`
            }
          }
          try {
            if(token){
                const {data} = await axios(`${process.env.API_URL}/usuarios/perfil`, config);
                const {data: formularioRespondido} = await axios.post(`${process.env.API_URL}/formulario`, {idUsuario: data._id}, config);
                setUsuario(data);
                if(data.tipo === 'usuario' && !formularioRespondido.enviado){
                    navigation.navigate('Formulario')
                    return;
                }
                else{
                    navigation.navigate('Actividades');
                    return;
                }
            }
          } catch (error) {
            console.log(error)
            // Alert.alert(error?.response?.data?.msg);
            return;
          }
        }
        comprobarToken();
      },[token])
    
    function visitarCrear(){
        navigation.navigate('Crear Cuenta');
    }
    function visitarIniciar(){
        navigation.navigate('Iniciar Sesion');
    }

  return (
    <SafeAreaView style={styles.contenedor}>
        <Image 
            source={require('../assets/logo.png')}
            style={styles.logo}
        />
        <Text style={styles.titulo}>Áureos</Text>
        <Text style={styles.slogan}>Toma un descanso</Text>
        <View style={styles.contenedorBotones}>
            <Pressable style={styles.botonCrear}
                onPress={()=>visitarCrear()}
            > 
                <Text style={styles.botonCrearTexto}>Crear una Cuenta</Text> 
            </Pressable>
            <Pressable style={styles.botonIniciar}
                onPress={()=>visitarIniciar()}
            > 
                <Text style={styles.botonIniciarTexto}>Iniciar Sesión</Text> 
            </Pressable>
        </View>
        

        <Navegacion usuario={usuario} token={token} visible={false}/>
        
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        width: 250,
        height: 250
    },
    titulo: {
        fontSize: 20,
        marginVertical: 10,
    } ,
    slogan: {
        textTransform: 'uppercase',
        marginVertical: 10
    },
    contenedorBotones:{
        marginTop: 10
    },
    botonCrear: {
        display: 'block',
        backgroundColor: '#6DD3B5',
        paddingVertical: 15,
        paddingHorizontal: 85,
        borderRadius: 5,
    },
    botonCrearTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    botonIniciar:{
        display: 'block',
        backgroundColor:'#fff',
        marginVertical: 20,
        paddingVertical: 15,
        paddingHorizontal: 85,
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
    botonIniciarTexto:{
        textAlign: 'center',
        fontWeight: 'semi-bold',
        fontSize: 20,
    }

  });

export default Inicio
