import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';

function Terminos({navigation}) {

    function irAlFormulario(){
        navigation.navigate('Formulario');
    }

  return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>Términos y Condiciones</Text>
        <ScrollView style={styles.contenido}>
            <Text style={styles.subtitulo}>Condiciones Generales y Particulares</Text>
            <Text style={styles.texto}>
            Estos Términos y Condiciones de Uso regulan las reglas a que se sujeta la utilización de la aplicación  <Text style={styles.span}>Aureos</Text>, que puede descargarse desde el dominio. La descarga o utilización de la APP atribuye la condición de Usuario a quien lo haga e implica la aceptación de todas las condiciones incluidas en este documento y en la Política de Privacidad y el Aviso Legal de dicha aplicación.
            </Text>
            <Text style={styles.texto}>
            Únicamente los Usuarios expresamente autorizados por la empresa podrán acceder a la
            descarga y uso de la APP. Los Usuarios que no dispongan de autorización, no podrán acceder a dicho
            contenido.
            </Text>
            <Text style={styles.texto}>
            Estadísticas anónimas: la empresa se reserva el derecho a realizar un seguimiento de tu
            actividad en la Aplicación de y a informar de ello a nuestros proveedores de servicios estadísticos de
            terceros. Todo ello de forma anónima.
            </Text>
        </ScrollView>
        <Pressable
            onPress={() => irAlFormulario()}
            style={styles.boton}
        >
            <Text style={styles.botonTexto}>Aceptar</Text>
        </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    contenedor:{
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderColor: '#6DD3B5',
        alignItems: 'center'
    },
    titulo: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5,
    },
    subtitulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#a0a0a0',
        marginVertical: 10,
    },
    contenido: {
        borderWidth: 2,
        borderColor: '#6DD3B5',
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 30,
    },
    texto: {
        fontSize: 18,
        textAlign: 'justify'
    },
    span: {
        color: '#6DD3B5',
        fontWeight: 'bold'
    },
    boton: {
        width: '90%',
        backgroundColor: '#6DD3B5',
        marginVertical: 20,
        padding: 10,
        borderRadius: 5,
    },
    botonTexto:{
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',

    }
})
export default Terminos
