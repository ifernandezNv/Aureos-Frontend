import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import useAureos from '../hooks/useAureos';
import axios from 'axios';

const Usuario = ({usuarioListado}) => {
    const {nombre, tipo, email} = usuarioListado;
    const {usuario} = useAureos();
    
  return (
    <View style={styles.contenedor}>
        <View>
            <Text>Nombre: {nombre}</Text>
            <Text>Correo: {email}</Text>
        </View>
        {usuario.tipo === 'admin' && (
            <View style={styles.contenedorBotones}>
                <Pressable style={[styles.boton, styles.botonEliminar]}>
                    <Text style={styles.botonTexto}>Eliminar</Text>
                </Pressable>
                <Pressable style={[styles.boton, styles.botonEditar]}>
                    <Text style={styles.botonTexto}>Editar</Text>
                </Pressable>
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
        backgroundColor: '#E8BC24',
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