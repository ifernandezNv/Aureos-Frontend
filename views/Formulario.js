import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Pressable, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useAureos from '../hooks/useAureos';

import { esconderTeclado } from '../helpers';

import { RadioButton, Text } from 'react-native-paper';
import Navegacion from '../components/Navegacion';

function Formulario({navigation}) {
  const {token, setToken, usuario, setUsuario} = useAureos();
  
  const [total, setTotal] = useState(0);

  const [opcion, setOpcion] = useState('');
  const [descarte, setDescarte] = useState('');

  const [respuestaR1, setRespuestaR1] = useState({});
  const [respuestaR2, setRespuestaR2] = useState({});
  const [respuestaR3, setRespuestaR3] = useState({});

  const [respuestas, setRespuestas] = useState([]);


  useEffect( ()=>{
    async function obtenerToken(){
      const tokenAlmacenado =  await AsyncStorage.getItem('token');
      if(tokenAlmacenado){
        setToken(tokenAlmacenado);
      }
    }
    obtenerToken()
  }, [])
  useEffect( ()=>{
    async function obtenerUsuario(){
      const config = {
        headers: {
          "Content-Type": 'application/json',
          authorization: `Bearer ${token}` 
        }
      }
      try {
        const {data} = await axios(`${process.env.API_URL}/usuarios/perfil`, config);
        return setUsuario(data);
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    }
    obtenerUsuario();
  },[token])


  function registrarRespuesta(){
    if(opcion === ''){
      Alert.alert('Debes seleccionar una opción');
      return;
    }
    if(opcion === 'actividades'){
      navigation.navigate('Actividades');
      return;
    }
    if(opcion === 'chat'){
      navigation.navigate('Chat');
      return;
    }
  }

  async function guardarRespuestas(){
    if(Object.values(respuestaR1).includes('') || Object.values(respuestaR2).includes('') || Object.values(respuestaR3).includes('')){
      
      Alert.alert('Error', 'Es necesario que selecciones una opción de cada pregunta');
      return
    }
    setRespuestas([respuestaR1, respuestaR2, respuestaR3]);
    console.log(respuestaR1);
    try {
      if(token){
        const config = {
          headers:{
            "Content-Type": 'application/json',
            authorization: `Bearer ${token}`
          }
        }
        const patologia = respuestas.reduce( (total, respuesta) => respuesta.valor + total,  0);
        const {data} = await axios.post(`${process.env.API_URL}/formulario/enviar-formulario`, {respuestas, patologia: Math.ceil(patologia / 3), idUsuario: usuario._id }, config);
        Alert.alert('Respuestas Registradas Correctamente');
        setTimeout(() => {
          if(patologia === 5){
            Alert.alert('Hey', 'Basado en tus respuestas, te recomendamos las siguientes opciones: ', [{text: 'Ver Actividades', onPress: ()=>{navigation.navigate('Actividades')}}, {text: 'Hablar con un profesional', onPress: ()=>navigation.navigate('Chat')}]);
            return;
          }
          navigation.navigate('Actividades');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(error?.response?.data?.message);
      return
    }
  }

  return (
    <Pressable
      onPress={ ()=>esconderTeclado()}
      style={styles.contenedor}
    >
      <Text style={styles.texto}>Hola: <Text style={styles.span}>{usuario?.nombre}{' '}</Text>¿Cómo podemos ayudarte?</Text>
      <ScrollView style={styles.formulario}
        contentContainerStyle={{
          justifyContent: 'center',
        }}
      >
        <Text style={styles.heading}>Formulario <Text style={styles.headingSpan}>Guía</Text> </Text>
        <View style={styles.campos}>
          
          <View style={styles.campo}>
            <Text>¿Qué te gustaría hacer?</Text>
            <RadioButton.Group
              onValueChange={ value => setOpcion(value)}
              value={opcion}
              checkedColor={'#6DD3B5'}
            >
              <RadioButton.Item
                label='Hablar con un profesional'
                value={'chat'}
                checkedColor='#6DD3B5'
              />

              <RadioButton.Item
                label='No sé cómo me siento'
                value={'formulario'}
                checkedColor='#6DD3B5'
              />

              <RadioButton.Item
                label='Ver actividades para relajarme'
                value={'actividades'}
                checkedColor='#6DD3B5'
              />
            </RadioButton.Group>
          </View>
          {opcion === 'formulario' ? (
            <>
              <View>
                <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                <RadioButton.Group
                  value={descarte}
                  onValueChange={(value)=>setDescarte(value)}
                >
                  <RadioButton.Item
                    label='Me siento triste o bajoneado'
                    value={'1 2'}
                    checkedColor='#6DD3B5'
                  />
                  
                  <RadioButton.Item
                    label='Siento que no voy a poder'
                    value={'3 4'}
                    checkedColor='#6DD3B5'
                  />
                
                  <RadioButton.Item
                    label='Me siento solo y/o abandonado'
                    value={'5'}
                    checkedColor='#6DD3B5'
                  />

                  <RadioButton.Item
                    label='Siento que las cosas importan menos'
                    value={'6'}
                    checkedColor='#6DD3B5'
                  />
                </RadioButton.Group>
              </View>
              {descarte === '1 2' && (
                  <>
                    <View>
                      <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                      <RadioButton.Group
                        value={respuestaR1.texto}
                        onValueChange={ (e) => {
                          setRespuestaR1({
                            texto: e,
                            valor: Number(e.split(' ')[0]),
                            identificador: e.split(' ')[1],
                          });
                        } }
                      >
                        <RadioButton.Item
                          label='Me siento con pocas ganas de hacer algo'
                          value={'2 1 a'}
                          checkedColor='#6DD3B5'
                        />
                      
                        <RadioButton.Item
                          label='Siento que la respiración me falla'
                          value={'1 1 b'}
                          checkedColor='#6DD3B5'
                        />

                        <RadioButton.Item
                          label='Siento que me equivoco en todo'
                          value={'1 1 c'}
                          checkedColor='#6DD3B5'
                        />

                        <RadioButton.Item
                          label='Estoy desesperado y no sé que hacer'
                          value={'2 1 d'}
                          checkedColor='#6DD3B5'
                        />
                      </RadioButton.Group>
                    </View>
                    <View>
                      <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                      <RadioButton.Group
                        value={respuestaR2.texto}
                        onValueChange={ (e) => {
                          setRespuestaR2({
                            texto: e,
                            valor: Number(e.split(' ')[0]),
                            identificador: e.split(' ')[1],
                          });
                        } }
                      >
                        <RadioButton.Item
                          label='Tengo ganas de desaparecer'
                          value={'1 2 2a'}
                          checkedColor='#6DD3B5'
                        />
                      
                        <RadioButton.Item
                          label='Solo tengo ganas de dormir'
                          value={'2 2 2b'}
                          checkedColor='#6DD3B5'
                        />

                        <RadioButton.Item
                          label='Siento que el corazón se me sale del pecho'
                          value={'1 2 2c'}
                          checkedColor='#6DD3B5'
                        />
                        <RadioButton.Item
                          label='Solo tengo ganas de llorar'
                          value={'2 2 2d'}
                          checkedColor='#6DD3B5'
                        />
                      </RadioButton.Group>
                    </View>
                    <View>
                      <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                      <RadioButton.Group
                        value={respuestaR3.texto}
                        onValueChange={ (e) => {
                          setRespuestaR3({
                            texto: e,
                            valor: Number(e.split(' ')[0]),
                            identificador: e.split(' ')[1],
                          });
                        }}
                      >
                        <RadioButton.Item
                          label='Solo quiero salir corriendo'
                          value={'1 3 3a'}
                          checkedColor='#6DD3B5'
                        />
                      
                        <RadioButton.Item
                          label='Solo quiero que el día acabe'
                          value={'2 3 3b'}
                          checkedColor='#6DD3B5'
                        />
                      </RadioButton.Group>
                    </View>
                  </>
                )}

                {descarte === '3 4' && (
                  <>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR1.texto}
                      onValueChange={ (e) => {
                        setRespuestaR1({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                        });
                      }}
                    >
                      <RadioButton.Item
                        label='Estoy desesperado y no sé que hacer'
                        value={'3 1 a'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='Las cosas siempre me salen mal'
                        value={'4 1 b'}
                        checkedColor='#6DD3B5'
                      />

                      <RadioButton.Item
                        label='Siento que no termino nada'
                        value={'3 1 c'}
                        checkedColor='#6DD3B5'
                      />

                      <RadioButton.Item
                        label='No me veo bien'
                        value={'4 1 d'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR2.texto}
                      onValueChange={ (e) => {
                        setRespuestaR2({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                        });
                      }}
                    >
                      <RadioButton.Item
                        label='Tengo muchas cosas por hacer'
                        value={'3 2 2a'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='Me siento inútil'
                        value={'4 2 2b'}
                        checkedColor='#6DD3B5'
                      />

                      <RadioButton.Item
                        label='Tengo poca energía para hacer las cosas'
                        value={'3 2 2c'}
                        checkedColor='#6DD3B5'
                      />
                      <RadioButton.Item
                        label='Las personas me ven extraño'
                        value={'4 2 2d'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR3.texto}
                      onValueChange={ (e) => {
                        setRespuestaR3({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                        });
                      }}
                    >
                      <RadioButton.Item
                        label='Tengo que hacer todo yo'
                        value={'3 3 3a'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='No estoy conforme conmigo mismo'
                        value={'4 3 4b'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                </>
              )}

              {descarte === '5' && (
                <>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR1.texto}
                      onValueChange={ (e) => {
                        setRespuestaR1({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                          
                        });
                      } }
                    >
                      <RadioButton.Item
                        label='Siempre me equivoco'
                        value={'5 1 a'}
                        checkedColor='#6DD3B5'
                      />
                      
                      <RadioButton.Item
                        label='He perdido el interés en muchas cosas'
                        value={'5 1 b'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='Siento que lo que hago no es suficiente'
                        value={'5 1 c'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR2.texto}
                      onValueChange={ (e) => {
                        setRespuestaR2({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                          
                        });
                      } }
                    >
                      <RadioButton.Item
                        label='No tengo interés de hacer nada nuevo'
                        value={'5 2 2a'}
                        checkedColor='#6DD3B5'
                      />
                      
                      <RadioButton.Item
                        label='Las cosas que hago no las disfruto'
                        value={'5 2 2b'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='Siento que todo se me sale de las manos'
                        value={'5 2 2c'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR3.texto}
                      onValueChange={ (e) => {
                        setRespuestaR3({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                          
                        });
                      } }
                    >
                      <RadioButton.Item
                        label='He tenido pensamientos negativos hacia la vida'
                        value={'5 3 3a'}
                        checkedColor='#6DD3B5'
                      />
                      
                      <RadioButton.Item
                        label='Generalmente estoy desmotivado'
                        value={'5 3 3b'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='Nada me sale como yo quiero'
                        value={'5 3 3c'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                </>
              )}

              {descarte === '6' && (
                <>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                    value={respuestaR1.texto}
                      onValueChange={ (e) => {
                        setRespuestaR1({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                          
                        });
                      } }
                    >
                      <RadioButton.Item
                        label='Siento que las cosas siempre me salen mal'
                        value={'6 1 a'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='No me siento seguro en una relación'
                        value={'6 1 b'}
                        checkedColor='#6DD3B5'
                      />

                      <RadioButton.Item
                        label='Siento que no cumplo mis expectativas'
                        value={'6 1 c'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR2.texto}
                      onValueChange={ (e) => {
                        setRespuestaR2({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                          
                        });
                      } }
                    >
                      <RadioButton.Item
                        label='Nadie se siente orgulloso de mí'
                        value={'6 2 2a'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='Las personas prefieren estar sin mí'
                        value={'6 2 2b'}
                        checkedColor='#6DD3B5'
                      />

                      <RadioButton.Item
                        label='Sé que mi pareja me engaña'
                        value={'6 2 2c'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                  <View>
                    <Text>Selecciona la opción con la que te sientas más identificad@</Text>
                    <RadioButton.Group
                      value={respuestaR3.texto}
                      onValueChange={ (e) => {
                        setRespuestaR3({
                          texto: e,
                          valor: Number(e.split(' ')[0]),
                          identificador: e.split(' ')[1],
                          
                        });
                      } }
                    >
                      <RadioButton.Item
                        label='Deseo estar siempre fuera de casa'
                        value={'6 3 3a'}
                        checkedColor='#6DD3B5'
                      />
                    
                      <RadioButton.Item
                        label='Quizás algo está roto en mí'
                        value={'6 3 3b'}
                        checkedColor='#6DD3B5'
                      />

                      <RadioButton.Item
                        label='El amor no fue hecho para alguien como yo'
                        value={'6 3 3c'}
                        checkedColor='#6DD3B5'
                      />
                    </RadioButton.Group>
                  </View>
                </>
              )}
            <Pressable
              style={styles.boton}
              onPress={ ()=>guardarRespuestas()}
            >
              <Text style={styles.botonTexto}>Registrar Respuestas</Text>
            </Pressable>
            </>
          ): (
            <Pressable
              style={styles.boton}
              onPress={ () => registrarRespuesta() }
            >
              <Text style={styles.botonTexto}>Enviar</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
      <Navegacion
        usuario={usuario}
        token={token}
        visible={false}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  contenedor:{
    padding: 20,
    flex: 1,
    backgroundColor: '#6DD3B5'
  },
  texto:{
    fontSize: 18
  },
  formulario:{
    paddingHorizontal: 10,

    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    
    elevation: 16,
  },
  heading:{
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 22
  },
  headingSpan:{
    fontWeight: 'bold',
    color: '#6DD3B5'
  },
  span: {
    color: '#fafafa',
    fontWeight: 'bold'
  },
  boton:{
    width: '100%',
    backgroundColor: '#6DD3B5',
    padding: 15,
    borderRadius: 10
  },
  botonTexto: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff', 
  },
})

export default Formulario
