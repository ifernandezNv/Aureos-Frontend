import { View, Text, Modal, Pressable, StyleSheet, TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import {esconderTeclado} from '../helpers';
import useAureos from '../hooks/useAureos'

import axios from 'axios';

const ModalFormulario = ({modal, setModal}) => {
  const {usuario, token} = useAureos();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState(0);
  const [instrucciones, setInstrucciones] = useState('');
  const [categoria, setCategoria] = useState('');



  function cerrarModal(){
    setModal(!modal);
  }

  async function crearActividad(){
    if([nombre, descripcion, instrucciones, categoria].includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if(duracion <= 0){
      Alert.alert('Error', 'Duración no válida');
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": 'application/json',
          authorization: `Bearer ${token}`
        }
      }
      const {data} = await axios.post(`${process.env.API_URL}/actividades/crear-actividad`, {nombre, descripcion, instrucciones, categoria, duracion, creadaPor: usuario._id, completadaPor: []}, config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Pressable
      style={{flex: 1, backgroundColor: '#f8f8f8', marginHorizontal: '10%', marginVertical: 30}}
      onPress={ ()=>esconderTeclado() }
    >
      <Modal
        visible={modal}
        transparent={false}
        animationType='slide'
        // presentationStyle='formSheet'
        
      >
        <View
          style={{
            flex: 1, 
            backgroundColor: '#fff', 
            marginHorizontal: '10%', 
            marginVertical: 30, 
            borderRadius: 10, 
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            
            elevation: 8,
          }}
        >
          <Pressable onPress={ ()=>cerrarModal()} style={styles.botonCerrar}>
            <Text style={styles.botonCerrarTexto}>X</Text>
          </Pressable>
          <View>
            <Text style={styles.encabezado}>Crea tus <Text style={styles.span}>Actividades</Text></Text>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre: </Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre: </Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre: </Text>
              <TextInput style={styles.input} />
            </View>
          </View>
          
        </View>
      </Modal>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 'auto',
    borderRadius: 10,
  },
  botonCerrar: {
    backgroundColor: '#6DD3B5',
    width: '10%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    marginLeft: '90%'
  },
  botonCerrarTexto: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
  },
  encabezado: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  span: {
    color: '#2FB18A',
    fontWeight: '700'
  },
  campo: {
    marginVertical: 10
  },
  label: {
    display: 'block'
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10
  }
})

export default ModalFormulario