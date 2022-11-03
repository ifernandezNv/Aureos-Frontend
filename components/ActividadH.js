import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Pressable, Text, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function ActividadH({actividad}) {
  const {duracion, imagen, titulo, descripcion, categoria} = actividad;
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
