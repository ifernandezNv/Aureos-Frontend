import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Imagen from '../assets/logo.png';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function CrearCuenta({navigation}) {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');


  function esconderTeclado(){
    Keyboard.dismiss();
  }

  async function crearUsuario(){
    try {
      const usuario = {
        nombre, email, password
      }
      const {data} = await axios.post(`${process.env.API_URL}/usuarios`, usuario);
      Alert.alert('Se envió un correo con las instrucciones para comprobar tu cuenta');
      navigation.navigate('Inicio');
      return;
    } catch (error) {
      console.log(error);
      Alert.alert(`${error.response.data.msg}`);
      return; 
    }
  }

  function handleSubmit(){
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if([nombre, email, password, repetirPassword].includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if(!regex.test(email)){
      Alert.alert('Email no válido');
      return;
    }
    if(password.length < 6){
      Alert.alert('El password debe de contener, al menos, 6 caracteres');
      return;
    }
    if(password !== repetirPassword){
      Alert.alert('Los passwords no coinciden');
      return;
    }
    crearUsuario();

  }

  return (
    <Pressable style={styles.contenedor}
      onPress={ () => esconderTeclado()}
    >
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          height: '100%'
        }}
      >
        <View style={styles.formulario}>
          <Text style={styles.heading}>Crea tu {''}
          <Text style={styles.headingSpan}>Cuenta</Text>
          </Text>
          
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre: </Text>
            <TextInput 
              placeholder='Tu nombre'
              style={styles.input}
              value={nombre}
              onChangeText={ (text) => setNombre(text)}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Correo: </Text>
            <TextInput 
              placeholder='Ej: correo@correo.com'
              keyboardType='email-address'
              style={styles.input}
              value={email}
              onChangeText={ (text) => setEmail(text)}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Password: </Text>
            <TextInput 
              placeholder='Tu contraseña'
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={ (text) => setPassword(text)}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Confirmar Password: </Text>
            <TextInput 
              placeholder='Reescribe el password anterior'
              secureTextEntry={true}
              style={styles.input}
              value={repetirPassword}
              onChangeText={ (text) => setRepetirPassword(text)}
            />
          </View>
          <Pressable style={styles.boton}
            onPress={ ()=>handleSubmit()}
          >
            <Text style={styles.botonTexto}>Crear Cuenta</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#6DD3B5',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    scrollView:{
      flex: 1,
      width: '100%',
    },
    formulario: {
      backgroundColor: '#fff',
      borderRadius: 10,
      height: '80%',
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
    campo:{
      marginTop: 10
    },
    label: {
      textTransform: 'uppercase',
      fontSize: 18,
    },
    input:{
      marginVertical: 5,
      padding: 5,
      borderBottomWidth: 1,
      borderColor: '#6DD3B5'
    },
    boton:{
      width: '100%',
      backgroundColor: '#6DD3B5',
      marginTop: 15,
      padding: 15,
      borderRadius: 10
    },
    botonTexto: {
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: '#fff', 
    }
})
export default CrearCuenta
