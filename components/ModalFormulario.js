import { View, Text, Modal, Pressable, StyleSheet, TextInput, Alert, Keyboard, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'

import useAureos from '../hooks/useAureos'
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const ModalFormulario = () => {
  const {usuario, token, actividadEditar, setActividadEditar, modal, setModal} = useAureos();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState(0);
  const [instrucciones, setInstrucciones] = useState('');
  const [identificador, setIdentificador] = useState(Date.now());
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [contenido, setContenido] = useState('');
  const [id, setId] = useState('');

  const navigation = useNavigation();

  useEffect(()=>{
    if(actividadEditar._id){
      setId(actividadEditar._id);
      setTitulo(actividadEditar.titulo);
      setDescripcion(actividadEditar.descripcion);
      setInstrucciones(actividadEditar.instrucciones);
      setIdentificador(actividadEditar.identificador);
      setCategoria(actividadEditar.categoria);
      setImagen(actividadEditar.imagen);
      setContenido(actividadEditar.contenido);
    }
    setDuracion(actividadEditar.duracion ? actividadEditar.duracion : duracion);
  },[actividadEditar])

  function cerrarModal(){
    setModal(!modal);
    setActividadEditar({});
    setTitulo('');
    setDescripcion('');
    setDuracion(0);
    setInstrucciones('');
    setImagen('');
    setCategoria('');
    setContenido('');
  }

  async function subirImagen(){
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        let imagenSubida = {
          uri: result.uri,
          type: `imagen`,
          name: `actividad_${titulo}`,
        }
        handleImagen(imagenSubida);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function subirContenido(){
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1.0,
      });
      if (!result.cancelled) {
        let contenidoSubido = {
          uri: result.uri,
          type: `imagen` || 'video',
          name: `video_${titulo}`,
          
        }
        handleVideo(contenidoSubido);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleImagen(imagenSubida){
    const data = new FormData();
      data.append("file", imagenSubida);
      data.append("upload_preset", "aureos");
      data.append("cloud_name", process.env.CLOUDINARY_NAME);
      fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, { method:'POST', body: data })
        .then(res=>res.json())
        .then(data=>{ console.log("Subida de imagen: ", data); setImagen(data.url); });
  }
  
  function handleVideo(videoSubido){
    const data = new FormData();
      data.append("file", videoSubido);
      data.append("upload_preset", "aureos");
      data.append("cloud_name", process.env.CLOUDINARY_NAME);
      fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/video/upload`, { method:'POST', body: data })
        .then(res=>res.json())
        .then(data=>{ console.log(data); Alert.alert('Video Subido Correctamente');  setContenido(data.url); });
  }

  function handleSubmit(){
    
    if([titulo, descripcion, instrucciones, categoria, imagen].includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if(duracion <= 0){
      Alert.alert('Error', 'Duración no válida');
      return;
    }
    if(id){
      editarActividad();
      return
    }
    crearActividad();
  }

  async function crearActividad(){
    try {
      const config = {
        headers: {
          "Content-Type": 'application/json',
          authorization: `Bearer ${token}`
        }
      }
      const {data} = await axios.post(`${process.env.API_URL}/actividades/crear-actividad`, {titulo, descripcion, imagen, instrucciones, categoria, duracion, creadaPor: usuario._id, completadaPor: [], identificador, contenido}, config);
      Alert.alert('Actividad creada correctamente');
      setTimeout(() => {
        setTitulo('');
        setDescripcion('');
        setDuracion(0);
        setInstrucciones('');
        setImagen('');
        setCategoria('');
        setContenido('');
        setModal(!modal);
        navigation.navigate('Actividades');
      }, 3000);
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  }

  async function editarActividad(){
    const config = {
      headers: {
        "Content-Type": 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios.put(`${process.env.API_URL}/actividades/editar/${id}`, {titulo, descripcion, duracion, instrucciones, imagen, categoria, contenido}, config);
      Alert.alert(data.msg);
      setTimeout(() => {
        setTitulo('');
        setDescripcion('');
        setDuracion(0);
        setInstrucciones('');
        setImagen('');
        setCategoria('');
        setContenido('');
        setModal(!modal);
        setActividadEditar({});
        navigation.navigate('Perfil');
      }, 3000);
    } catch (error) {
      console.log(error);
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
          <ScrollView>
            <Pressable onPress={ ()=>cerrarModal()} style={styles.botonCerrar}>
              <Text style={styles.botonCerrarTexto}>X</Text>
            </Pressable>
            <View>
              <Text style={styles.encabezado}>{actividadEditar._id ? 'Edita' : 'Crea'} tus <Text style={styles.span}>{actividadEditar._id ? 'Actividad' : 'Actividades'}</Text></Text>
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
                <TextInput style={styles.input} keyboardType='number-pad' placeholder='5 (minutos)' value={Number(duracion)} onChangeText={value => setDuracion(Number(value))}  />
              </View>

              <View style={styles.campo}>
                <Text style={styles.label}>Instrucciones: </Text>
                <TextInput style={styles.input} placeholder='Pasos a seguir para completar la actividad' value={instrucciones} onChangeText={value=> setInstrucciones(value)}  />
              </View>

              <View style={styles.campo}>
                <Text style={styles.label}>Imagen: </Text>
                <Text>{imagen.length ? `Link de la imagen: ${imagen}`  : 'Aquí se mostrará la url de la imagen una vez se haya subido'}</Text>
                <Pressable onPress={ ()=>subirImagen()} style={styles.botonImagen}>
                    <Text style={styles.botonTexto}>Subir Imagen</Text>
                    {imagen.url && (<Text>Url de la imagen{imagen}</Text>)}
                </Pressable>
              </View>

              <View style={styles.campo}>
                <Text style={styles.label}>Contenido Multimedia: </Text>
                <Text>{contenido?.length ? contenido : 'Aquí se mostrará el contenido una vez se haya subido'}</Text>
                <Pressable onPress={ ()=>subirContenido()} style={styles.botonImagen}>
                    <Text style={styles.botonTexto}>Subir Contenido</Text>
                </Pressable>
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
                <Picker.Item label='--- Seleccione ---' value=''/>
                <Picker.Item label='Estrés' value='Estrés'/>
                <Picker.Item label='Ansiedad' value='Ansiedad'/>
                <Picker.Item label='Depresión' value='Depresión'/>
                <Picker.Item label='Problemas de Autoestima' value='Problemas de Autoestima'/>
                <Picker.Item label='Pérdida del sentido de la vida' value='Pérdida del sentido de la vida'/>
                <Picker.Item label='Relaciones' value='Relaciones'/>
              </Picker>

                <Pressable style={styles.boton}
                  onPress={ ()=>handleSubmit() }
                >
                  <Text style={styles.botonTexto}>{actividadEditar._id ? 'Guardar Cambios' : 'Crear Actividad'}</Text>
                </Pressable>

            </View>
            </ScrollView>
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
    borderColor: '#e1e1e1',
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
  botonImagen:{
    padding: 10,
    backgroundColor: '#2FB18A',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
  botonTexto: {
      fontSize: 20,
      textAlign: 'center',
      color: '#fff',
      fontWeight: '900'
  }
})

export default ModalFormulario