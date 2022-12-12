import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {View, Text, StyleSheet} from 'react-native';

function Navegacion({usuario, token, visible}) {

  const [viewActual, setViewActual] = useState({});
  const navigation = useNavigation();
  useEffect(()=>{
    obtenerViewActual();
  },[navigation.getState().routes])

  function obtenerViewActual(){
    setViewActual(navigation.getState().routes[navigation.getState().routes.length -1])
  }

  function irAlChat(){
    navigation.navigate('Chat', {usuario, token});
  }

  function irAActividades(){
    navigation.navigate('Actividades', {usuario, token});
  }
  
  function irAlPerfil(){
    navigation.navigate('Perfil', {usuario, token});
  }

  return (
    <View style={visible ? [styles.navegacion] : [styles.esconder]}>
      <View>
        <Button
          onPress={ ()=> irAActividades()}
          icon='home-circle-outline'
          style={viewActual?.name === 'Actividades' ? [styles.active] : [styles.iconoNav]} 
        >
          <View style={viewActual?.name === 'Actividades' && [styles.icono]}></View>
        </Button>
      </View>

      <View>
        <Button
          onPress={ ()=> irAlChat()}
          icon={'chat-outline'}
          style={viewActual?.name === 'Chat' ? [styles.active, styles.element] : [styles.iconoNav]} 
        >
          <View style={viewActual?.name === 'Chat' && [styles.icono]}></View>
        </Button>
      </View>

      <View>
        <Button
          icon='account-circle-outline'
          onPress={ ()=> irAlPerfil()}
          style={viewActual?.name === 'Perfil' ? [styles.active, styles.element] : [styles.iconoNav]} 
          >
            <View style={viewActual?.name === 'Perfil' && [styles.icono]}></View>
          </Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  navegacion: {
    position: 'absolute',
    bottom: 20,
    height: 60,
    width: '70%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: '15%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  esconder: {
    display: 'none'
  },
  iconoNav: {
    color: '#000',
    height: 20,
    width: 50,
    fontSize: 40
  },
  active: {
    // backgroundColor: '#000',
    color: '#6DD3B5',
    height: 50,
    display: 'flex',
    position: 'abssolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: 0,
    borderRadius: '50%',
    backgroundColor: '#6DD3B5'
  }
})

export default Navegacion;