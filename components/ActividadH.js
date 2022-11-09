import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Pressable, Text, Image, ImageBackground } from 'react-native';
import useAureos from '../hooks/useAureos';
import ModalFormulario from './ModalFormulario';

function ActividadH({actividad}) {
  const {imagen, titulo} = actividad;
  const {usuario, token, modal, setModal, setActividadEditar} = useAureos();

  function editarActividad(){
    setActividadEditar(actividad);
    console.log(actividad);
    setModal(!modal);
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
              <>
                <Pressable style={styles.boton} onPress={ ()=> editarActividad()}>
                  <Text style={styles.botonTexto}>Editar</Text>
                </Pressable>
              </>
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
    boton: {
      backgroundColor: '#6DD3B5',
      padding: 10,
      borderRadius: 10,
      width: '50%',
      position: 'absolute',
      bottom: 0,
      marginHorizontal: '25%',
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    botonTexto: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: '900',
      textTransform: 'uppercase'
    }

});

export default ActividadH
