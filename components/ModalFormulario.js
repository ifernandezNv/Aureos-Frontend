import { View, Text, Modal, Pressable, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'
import React, {useState} from 'react'

import useAureos from '../hooks/useAureos'
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ModalFormulario = ({modal, setModal}) => {
  const {usuario, token} = useAureos();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState(0);
  const [instrucciones, setInstrucciones] = useState('');
  const [identificador, setIdentificador] = useState(Date.now());
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('https://res.cloudinary.com/ds6v7rbvr/image/upload/v1666577364/actividad_hablar_suzjnr.png');
  const navigation = useNavigation();


  function cerrarModal(){
    setModal(!modal);
  }

  async function crearActividad(){
    console.log(duracion);
    if([titulo, descripcion, instrucciones, categoria, imagen].includes('')){
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
      const {data} = await axios.post(`${process.env.API_URL}/actividades/crear-actividad`, {titulo, descripcion, imagen, instrucciones, categoria, duracion, creadaPor: usuario._id, completadaPor: [], identificador}, config);
      console.log(data);
      Alert.alert('Actividad creada correctamente');
      setTimeout(() => {
        setTitulo('');
        setDescripcion('');
        setDuracion(0);
        setInstrucciones('');
        setImagen('');
        setCategoria('');
        setModal(!modal);
        navigation.navigate('Perfil');
      }, 3000);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  function hideKeyboard(){
    Keyboard.dismiss();
  }

  return (
    <Pressable
      style={{flex: 1, backgroundColor: '#f8f8f8', marginHorizontal: '10%', marginVertical: 30}}
    >
      <Modal
        visible={modal}
        transparent={false}
        animationType='slide'
        // presentationStyle='formSheet'
        
      >
        <Pressable
          onPress={ ()=>hideKeyboard() }
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
              <Text style={styles.label}>Titulo: </Text>
              <TextInput style={styles.input} value={titulo} onChangeText={value=> setTitulo(value)} />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Descripcion: </Text>
              <TextInput style={styles.input} value={descripcion} onChangeText={value=> setDescripcion(value)}  />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Duración (minutos): </Text>
              <TextInput style={styles.input} keyboardType='number-pad' placeholder='5 (minutos)' value={duracion} onChangeText={value => setDuracion(Number(value))}  />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Instrucciones: </Text>
              <TextInput style={styles.input} placeholder='Pasos a seguir para completar la actividad' value={instrucciones} onChangeText={value=> setInstrucciones(value)}  />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Imagen: </Text>
              <TextInput style={styles.input} placeholder=''  value={imagen} onChangeText={value=> setImagen(value)} />
            </View>

            <Text style={styles.label}>Categoría: </Text>
            <Picker selectedValue={categoria}
              onValueChange={(value)=>setCategoria(value)}

              itemStyle={{
                marginVertical: 0,
                padding: 0,
                height: 120
              }}
            >
              <Picker.Item label='Estrés' value='Estrés'/>
              <Picker.Item label='Ansiedad' value='Ansiedad'/>
              <Picker.Item label='Depresión' value='Depresión'/>
              <Picker.Item label='Problemas de Autoestima' value='Problemas de Autoestima'/>
              <Picker.Item label='Pérdida del sentido de la vida' value='Pérdida del sentido de la vida'/>
              <Picker.Item label='Relaciones' value='Relaciones'/>
            </Picker>

              <Pressable style={styles.boton}
                onPress={ ()=>crearActividad() }
              >
                <Text style={styles.botonTexto}>Crear Actividad</Text>
              </Pressable>

          </View>
          
        </Pressable>
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
    display: 'block',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    color: '#000',
    padding: 10
  },
  boton: {
    width: '70%',
    marginHorizontal: '15%',
    backgroundColor: '#6DD3B5',
    padding: 10,
    borderRadius: 10,
},
botonTexto: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900'
}
})

export default ModalFormulario