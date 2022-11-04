import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import {Button} from 'react-native-paper';
import { useEffect } from 'react';
import useAureos from '../hooks/useAureos';
import Navegacion from '../components/Navegacion';
import axios from 'axios';

const VerActividad = ({navigation, route}) => {
    
    const {id} = route.params;
    const {setActividadSeleccionada, actividadSeleccionada, token} = useAureos();

    useEffect(()=>{
        if(id){
            obtenerActividad();
            return
        }
        async function obtenerActividad(){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await axios(`${process.env.API_URL}/actividades/${id}`, config);
                setActividadSeleccionada(data);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    },[])
    const {categoria, descripcion, instrucciones, titulo, imagen, duracion} = actividadSeleccionada;
    
    function volver(){
        navigation.goBack();
    }

    async function completarActividad(){
        console.log('completada jejejejejeje');
    }

  return (
    <>
        <Button onPress={()=>volver()} style={styles.botonVolver} icon='arrow-left'>Volver</Button>
        <View style={styles.contenedor}>
            <View style={styles.actividad}>
                <Image
                    source={{uri : actividadSeleccionada.imagen}}
                    style={styles.imagenStyles}
                />
                <View style={styles.contenido}>
                    <Text>Duración: {actividadSeleccionada.duracion}</Text>
                    <Text>{actividadSeleccionada.titulo}</Text>
                    <Text>{actividadSeleccionada.descripcion}</Text>
                    <Text>{actividadSeleccionada.instrucciones}</Text>
                </View>
                <Pressable style={styles.boton} onPress={ ()=> completarActividad()}>
                    <Text style={styles.botonTexto}>Hecha</Text>
                </Pressable>
            </View>

        </View>

        <Navegacion visible={true}/>
    </>
  )
}

const styles = StyleSheet.create({
    botonVolver:{
        paddingVertical: 20,
        backgroundColor: '#fff'
    },
    contenedor: {
        flex: 1,
        backgroundColor: '#fff',
    },
    actividad: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imagenStyles:{
        width: '100%',
        height: 270,
    },
    contenido: {
        paddingHorizontal: 30,
        paddingVertical: 20,
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
});

export default VerActividad