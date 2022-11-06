import { View, Text, StyleSheet, Image, Platform, Pressable, Alert } from 'react-native';
import {Button} from 'react-native-paper';
import { useEffect } from 'react';
import useAureos from '../hooks/useAureos';
import Navegacion from '../components/Navegacion';
import axios from 'axios';

const VerActividad = ({navigation, route}) => {
    
    const {id} = route.params;
    const {setActividadSeleccionada, actividadSeleccionada, token, usuario} = useAureos();

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
                console.log(error.response?.data?.msg);
            }
        }
    },[])
    const {categoria, descripcion, instrucciones, titulo, imagen, duracion, _id} = actividadSeleccionada;
    
    function volver(){
        navigation.goBack();
    }

    async function completarActividad(){
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axios.put(`${process.env.API_URL}/actividades/${_id}`, {idUsuario: usuario._id}, config );
            Alert.alert(data.msg);
            setTimeout(() => {
               navigation.goBack() 
            }, 1000);
        } catch (error) {
            console.log(error.response);
        }
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
                {actividadSeleccionada.completadaPor.includes(usuario._id) ? (
                    <Pressable style={styles.botonDisabled}>
                        <Text style={styles.botonTexto}> Actividad Completada</Text>
                    </Pressable>
                ) : (
                    <Pressable style={actividadSeleccionada.completadaPor.includes(usuario._id) ? styles.botonDisabled : styles.boton} onPress={ ()=> completarActividad()}>
                        <Text style={styles.botonTexto}>{actividadSeleccionada.completadaPor.includes(usuario._id) ? 'Actividad Completada' : 'Completar'}</Text>
                    </Pressable>
                )}
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
    botonDisabled: {
        width: '70%',
        marginHorizontal: '15%',
        backgroundColor: '#7AB7A5',
        padding: 10,
        borderRadius: 10,
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