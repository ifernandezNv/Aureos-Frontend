import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import {Button} from 'react-native-paper';

import useAureos from '../hooks/useAureos';
import Navegacion from '../components/Navegacion';
const VerActividad = ({navigation}) => {

    const {actividadSeleccionada} = useAureos();
    const {categoria, descripcion, instrucciones, titulo, imagen, duracion} = actividadSeleccionada;
    
    function volver(){
        navigation.goBack();
    }
  return (
    <>
        <Button onPress={()=>volver()} style={styles.botonVolver} icon='arrow-left'>Volver</Button>
        <View style={styles.contenedor}>
            <View style={styles.actividad}>
                    <Image
                        source={{uri : imagen}}
                        style={styles.imagenStyles}
                    />
                <View style={styles.contenido}>
                    <Text>Duración: {duracion}</Text>
                    <Text>{titulo}</Text>
                    <Text>{descripcion}</Text>
                    <Text>{instrucciones}</Text>
                </View>
                
            </View>
        </View>

        <Navegacion visible={true}/>
    </>
  )
}

const styles = StyleSheet.create({
    botonVolver:{
        paddingVertical: Platform.OS === 'ios' ? 30 : 20,
        backgroundColor: '#fff'
    },
    contenedor: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,
    },
    actividad: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        borderRadius: 10
    },
    imagenStyles:{
        width: '100%',
        height: 150,
    },
    contenido: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    }
});

export default VerActividad