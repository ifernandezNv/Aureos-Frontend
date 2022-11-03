import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import {Button} from 'react-native-paper';
import Navegacion from '../components/Navegacion';

const Videos = ({navigation}) => {

    function volver(){
        navigation.goBack();
    }
  return (
    <View style={styles.contenedor}>
        <Image
            style={{
                width: 250,
                height: 200,
            }}
            source={{uri: 'https://www.intuitiveaccountant.com/downloads/9043/download/working-on-it.png?cb=287a36a90eae40f6bf55da1fddea7c1e'}}
        />
      <Text>Heeey, Aún no hay videos disponibles de esta categoría</Text>
      <Text>Seguimos trabajando en eso!!!</Text>
      <Pressable onPress={ ()=> volver()}
        style={styles.boton}
      ><Text style={styles.botonTexto}>Volver</Text></Pressable>
      <Navegacion visible={true}/>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1, 
        backgroundColor: '#fff', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    boton: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    botonTexto: {
        fontSize: 24,
        fontWeight: '700',
        color: '#6DD3B5',
    }
})

export default Videos