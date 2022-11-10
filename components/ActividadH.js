import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Pressable, Text, Image, ImageBackground, Alert } from 'react-native';
import useAureos from '../hooks/useAureos';
import { useNavigation } from '@react-navigation/native';

import {Button} from 'react-native-paper';
import axios from 'axios';

function ActividadH({actividad}) {
  const {imagen, titulo} = actividad;
  const {usuario, token, modal, setModal, setActividadEditar} = useAureos();

  const navigation = useNavigation();

  function editarActividad(){
    setActividadEditar(actividad);
    setModal(!modal);
  }

  async function eliminarActividad(){
    const config = {
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    
    try {
      const {data} = await axios.post(`${process.env.API_URL}/actividades/borrar/${actividad._id}`, {id: actividad._id}, config);
      Alert.alert(data.msg);
      setTimeout(() => {
        navigation.navigate('Actividades');
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  }

  function mostrarAlerta(){
    Alert.alert('¿Estás seguro de eliminar esta actividad?', 'Una actividad eliminada no podrá ser recuperada', [{text: 'Cancelar'}, {text:"Si, eliminar", onPress: ()=>eliminarActividad()}])
  }


  return (
    <View style={styles.card}>
        <ImageBackground
          source={{uri: imagen}}
          style={{
            width: '100%',
            height: 250,
            borderRadius: 50,
            borderColor: '#000'
          }}
        >
            <View style={styles.contenido}>
                <Text style={styles.titulo}>{titulo}</Text>
            </View>
            {usuario.tipo !== 'usuario' && (
              <View style={styles.contenedorBotones}>
                <Button style={[styles.boton, styles.editar]} onPress={ ()=> editarActividad()}>
                  <Text style={styles.botonTexto}>Editar</Text>
                </Button>
                <Button style={[styles.boton, styles.eliminar]} onPress={ ()=> mostrarAlerta()}>
                  <Text style={styles.botonTexto}>Eliminar</Text>
                </Button>
              </View>
            )}
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        width: 250,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    background: {
        height: 200
    },
    duracion: {
      padding: 10,
      fontWeight: '300',
      fontSize: 14
    }, 
    contenido: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 5,
    },
    titulo: {
      fontWeight: '700',
      fontSize: 18,
      marginVertical: 5,
    },
    descripcion: {
      fontSize: 14,
      fontWeight: '300',
      textAlign: 'justify'
    },
    contenedorBotones: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: '5%',
      position: 'absolute',
      bottom: 0,
    },
    boton: {
      width: '100%',
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    editar: {
      backgroundColor: '#F1C006'
    },
    eliminar: {
      backgroundColor: '#DE0D0D'
    },
    botonTexto: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: '900',
      textTransform: 'uppercase'
    }

});

export default ActividadH
