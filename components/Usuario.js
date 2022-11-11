import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import useAureos from '../hooks/useAureos';
import axios from 'axios';

const Usuario = ({usuarioListado}) => {
    const {nombre, email} = usuarioListado;
    const {usuario, token} = useAureos();
    const navigation = useNavigation();
    function mostrarAlerta(){
        Alert.alert('¿Estás seguro de eliminar este usuario?', 'Un usuario eliminado no podrá ser recuperado', [{text: 'No, Cancelar'}, {text:'Si, eliminar', onPress: ()=>eliminarUsuario()}])
    }

    async function eliminarUsuario(){
        const config = {
            headers: {
                "Content-Type": 'application/json',
                authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axios.delete(`${process.env.API_URL}/usuarios/eliminar/${usuarioListado._id}`, config);
            Alert.alert(data.msg);
            setTimeout(() => {
                navigation.navigate('Actividades');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <View style={styles.contenedor}>
        <View>
            <Text>Nombre: {nombre}</Text>
            <Text>Correo: {email}</Text>
        </View>
        {usuario.tipo === 'admin' && (
            <View style={styles.contenedorBotones}>
                <Pressable style={[styles.boton, styles.botonEliminar]} onPress={ ()=>mostrarAlerta()}>
                    <Text style={styles.botonTexto}>Eliminar</Text>
                </Pressable>
                {/* <Pressable style={[styles.boton, styles.botonEditar]}>
                    <Text style={styles.botonTexto}>Editar</Text>
                </Pressable> */}
            </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },
    contenedorBotones:{
        paddingHorizontal: 10,
    },
    boton: {
        padding: 5,
        borderRadius: 10,
    },
    botonEditar: {
        backgroundColor: '#6DD3B5',
        marginVertical: 10
    },
    botonEliminar: {
        backgroundColor: 'red'
    },
    botonTexto: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',

    }
})

export default Usuario