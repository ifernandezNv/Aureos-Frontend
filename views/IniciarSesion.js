import React, {useEffect, useState} from 'react';
import Imagen from '../assets/logo.png';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAureos from '../hooks/useAureos';

import axios from 'axios';
function IniciarSesion({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        const {data} = await axios(`${process.env.API_URL}/usuarios/perfil`, config);
        setUsuario(data);
        if(data.tipo === 'usuario'){
            navigation.navigate('Formulario')
            return;
        }
        else{
            navigation.navigate('Actividades');
            return;
        }
      } catch (error) {
        console.log(error?.response?.data.msg);
        return;
      }
    }
    return ()=>{comprobarToken()}
  },[token])

 

  async function iniciarSesion(){
  
    try {
      const {data} = await axios.post(`${process.env.API_URL}/usuarios/login`, {email, password});
      console.log(data);
      setUsuario(data);
      setToken(data.token);
      const config = {
        headers: {
          "Content-Type": 'application/json',
          authorization: `Bearer ${data.token}`
        }
      }
      const {data: formularioRespondido} = await axios.post(`${process.env.API_URL}/formulario`, {idUsuario: data._id}, config);
      
      Alert.alert('Iniciando Sesión...');
      AsyncStorage.setItem('token', data.token);
      if(formularioRespondido?.enviado && data.tipo === 'usuario'){
        setTimeout(() => {
          navigation.navigate('Actividades', {usuario: data, token});
        }, 3000);
        return;
      }
      setTimeout(() => {
        navigation.navigate('Terminos', {usuario: data, token});
      }, 3000);
    } catch (error) {
      Alert.alert(`${error?.response?.data?.msg}`);
    }
  }

  function handleSubmit(){
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if([email, password].includes('')){
      Alert.alert('Todos los campos son obligatorios');
      return;
    }
    if(!regex.test(email)){
      Alert.alert('Email no válido');
      return;
    }
    iniciarSesion();
  }

  function irOlvidePassword(){
    navigation.navigate('Olvide')
  }

  function esconderTeclado(){
    Keyboard.dismiss();
  }
  return (
    <Pressable style={styles.contenedor}
      onPress={ () => esconderTeclado()}
    >
      <View style={styles.formulario}>
        <Text style={styles.heading}>Inicia {''}
        <Text style={styles.headingSpan}>Sesión</Text>
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Correo: </Text>
          <TextInput 
            placeholder='Ej: correo@correo.com'
            keyboardType='email-address'
            style={styles.input}
            value={email}
            onChangeText={ (texto)=>setEmail(texto) }
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Password: </Text>
          <TextInput 
            placeholder='Tu contraseña'
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={ (texto)=>setPassword(texto) }
          />
        </View>
        <Pressable style={styles.boton}
          onPress={ ()=>handleSubmit()}
        >
          <Text style={styles.botonTexto}>Iniciar Sesión</Text>
        </Pressable>
      </View>
      <Pressable style={styles.olvide}
        onPress={ () => irOlvidePassword()}
      >
        <Text style={styles.olvideTexto}>Olvidé mi contraseña</Text>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#6DD3B5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formulario: {
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '50%',
    width: '90%',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    
    elevation: 11,
  },
  heading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 28,
    marginBottom: 20,
    fontWeight: '700'
  },
  headingSpan: {
    color: '#6DD3B5',
    marginLeft: 20
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
  input:{
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#6DD3B5'
  },
  boton:{
    width: '100%',
    backgroundColor: '#6DD3B5',
    padding: 15,
    borderRadius: 10
  },
  botonTexto: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff', 
  },
  olvide:{
    marginTop: 20,
    padding: 15,
    borderRadius: 5,

  },
  olvideTexto:{
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 18,
  }
})

export default IniciarSesion
