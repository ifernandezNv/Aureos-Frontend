import React, {useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, Alert } from 'react-native';
import axios from 'axios';

function OlvidePassword({navigation}) {

    const [email, setEmail] = useState('');

    async function handleSubmit(){
        if(email === ''){
            Alert.alert('El email es oblgiatorio');
            return;
        }
        try {
            const {data} = await axios.post(`${process.env.API_URL}/usuarios/olvide-password`, {email});
            Alert.alert(data.msg);
            setTimeout(() => {
                navigation.navigate('Inicio');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
    function esconderTeclado(){
        Keyboard.dismiss();
    }

  return (
    <Pressable style={styles.contenedor}
        onPress={ () => esconderTeclado()}
    >
        <View style={styles.formulario}>
            <Text style={styles.heading}>Cambiar {''}
            <Text style={styles.headingSpan}>Password</Text>
            </Text>

            <View style={styles.campo}>
                <Text style={styles.label}>Correo: </Text>
                <TextInput 
                placeholder='Ej: correo@correo.com'
                keyboardType='email-address'
                style={styles.input}
                value={email}
                onChangeText={ (text)=> setEmail(text)}
                />
            </View>

            <Pressable style={styles.boton}
                onPress={ ()=>handleSubmit()}
            >
                <Text style={styles.botonTexto}>Cambiar Password</Text>
            </Pressable>
        </View>
        <Pressable style={styles.volver}
                onPress={ () => navigation.goBack()}
            >
                <Text style={styles.volverTexto}>Volver</Text>
            </Pressable>
    </Pressable>
)}

const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      backgroundColor: '#6DD3B5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formulario: {
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      height: '40%',
      width: '90%',
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      
      elevation: 11,
    },
    heading: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: 28,
      marginBottom: 20,
      fontWeight: '700'
    },
    headingSpan: {
      color: '#6DD3B5',
      marginLeft: 20
    },
    campo:{
        marginVertical: 15
    },
    label: {
      textTransform: 'uppercase',
      fontSize: 18,
    },
    input:{
      padding: 5,
      borderBottomWidth: 1,
      borderColor: '#6DD3B5'
    },
    boton:{
      width: '100%',
      backgroundColor: '#6DD3B5',
      padding: 15,
      borderRadius: 10,
      marginTop: 20
    },
    botonTexto: {
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: '#fff', 
    },
    volver:{
        marginVertical: 15,
    },
    volverTexto:{
        fontSize: 18,
        fontWeight: '400',
        textTransform: 'uppercase'
    }
});

export default OlvidePassword
