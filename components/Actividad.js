import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import useAureos from '../hooks/useAureos';

function Actividad({actividad}) {
  const {duracion, imagen, titulo, descripcion, categoria} = actividad;
  const {actividadSeleccionada, setActividadSeleccionada} = useAureos();
  const navigation = useNavigation();
  
  function verActividad(activity){
    setActividadSeleccionada(activity);
    navigation.navigate('Ver Actividad', {actividadSeleccionada});

  }

  return (
    <View style={styles.card}>
        <Text style={styles.duracion}>Duración: {duracion} minutos</Text>
        <Image
          source={{uri: imagen}}
          style={{
            width: '100%',
            height: 118,
            borderRadius: 50,
            borderColor: '#000'
          }}
        />
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.descripcion}>{descripcion}</Text>
        </View>
        <Pressable
          style={styles.boton}
          onPress={ () => verActividad(actividad)}
        >
          <Text style={styles.botonTexto}>Comenzar</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

    card:{
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
    duracion: {
      padding: 10,
      fontWeight: '300',
      fontSize: 14
    }, 
    contenido: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 5
    },
    titulo: {
      fontWeight: '700',
      fontSize: 18,
      marginVertical: 5
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

export default Actividad
