import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Platform, ScrollView, StyleSheet, Pressable, FlatList, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import useAureos from '../hooks/useAureos';

import Navegacion from '../components/Navegacion';
import Actividad from '../components/Actividad';
import axios from 'axios';



const PATOLOGIAS = [
  {
    id: 1,
    nombre: 'Ansiedad',
  },
  {
    id: 2,
    nombre: 'Depresión',
  },
  {
    id: 3,
    nombre: 'Estrés',
  },
  {
    id: 4,
    nombre: 'Problemas de autoestima',
  },
  {
    id: 5,
    nombre: 'Perdida de sentido de la vida',
  },
  {
    id: 6,
    nombre: 'Relaciones',
  }
]

function Actividades({route, navigation}) {

  const {actividades, setActividades, usuario, token, actividadSeleccionada, setActividadSeleccionada} = useAureos();

  const [categoria, setCategoria] = useState('');


  useEffect(()=>{
    obtenerActividades();
  },[])

  useEffect(()=>{
      if(categoria === 'todas' || categoria === ''){
        obtenerActividades();
        return;
      }else{
        obtenerActividadesCategoria();
        return;
      }
      
  },[categoria])

  async function obtenerActividades(){
    const config = {
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios(`${process.env.API_URL}/actividades`, config);
      setActividades(data);
    } catch (error) {
      console.log("Desde error en la consulta de actividades (general): ", error?.response?.data?.msg);
    }
  }

  async function obtenerActividadesCategoria(){
    const config = {
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }
    try {
      const {data} = await axios.post(`${process.env.API_URL}/actividades`, {categoria}, config);
      if(data.length === 0){
        Alert.alert('Aún no hay actividades de esta categoría');
        setActividades({});
        return;
      }
      setActividades(data);
    } catch (error) {
      console.log("Desde error en la consulta", error.response.data.msg);
    }
  }

  function irAActividadesRecomendadas(){
    navigation.navigate('Actividades Recomendadas', {usuario, token})
  }

  function verVideos(){
    navigation.navigate('Videos');
  }

  return (
    <View style={styles.contenedor}>

      <View style={styles.header}>
        <Text style={styles.headerHeading}>Recursos</Text>
      </View>

      <View style={styles.contenido}>
        
        <View style={styles.hero}>
          <Text style={styles.heading}>Actividades Recomendadas</Text>
          <Text style={styles.texto}>Basado en los resultados del formulario, se recomiendan las siguientes actividades y videos.</Text>
          <View style={styles.contenedorBotones}>
            <Pressable style={[styles.boton]}
              onPress={ () => irAActividadesRecomendadas()}
            >
              <Text style={styles.botonTexto}>Ver Actividades</Text>
            </Pressable>

            <Pressable style={[styles.boton]} onPress={()=>verVideos()}>
              <Text style={styles.botonTexto}>Ver Videos</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.actividades}
          horizontal={false}
        >
          <Text style={styles.encabezado}>Actividades <Text style={styles.span}>Populares</Text></Text>

          <View>
            <Text style={styles.categorias}>Categoría:</Text>
            <View style={styles.contenedorFiltros}>
                <Button style={categoria === 'todas' ? [styles.botonFiltroActive] : [styles.botonFiltro]}
                  onPress={()=> setCategoria('todas')}
                > <Text style={styles.filtroText}>Todas</Text></Button>
                <Button style={categoria === 'Ansiedad' ? [styles.botonFiltroActive] : [styles.botonFiltro]}
                  onPress={()=> setCategoria('Ansiedad')}
                > <Text style={styles.filtroText}>Ansiedad</Text></Button>
                <Button style={categoria === 'Depresión' ? [styles.botonFiltroActive] : [styles.botonFiltro]}
                  onPress={()=> setCategoria('Depresión')}
                > <Text style={styles.filtroText}>Depresión</Text></Button>
                <Button style={categoria === 'Estrés' ? [styles.botonFiltroActive] : [styles.botonFiltro]}
                  onPress={()=> setCategoria('Estrés')}
                > <Text style={styles.filtroText}>Estrés</Text></Button>
                <Button style={categoria === 'Problemas de autoestima' ? [styles.botonFiltroActive] : [styles.botonFiltro]}
                  onPress={()=> setCategoria('Problemas de autoestima')}
                > <Text style={styles.filtroText}>Problemas de autoestima</Text></Button>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{width: '100%', height: '100%'}}
          >
            <FlatList
              data={actividades}
              keyExtractor={ (actividad) => (actividad._id.toString()) }
              renderItem={ ({item}) => (
                <Actividad actividad={item}/>
              )}
              style={styles.actividadesList}
            />
          </ScrollView>
        </ScrollView>
      </View>
      <Navegacion visible={true} usuario={usuario} token={token} />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    borderBottomWidth: .2
  },
  headerHeading:{
    textAlign: 'center',
    fontWeight: '700',
    margin: 0,
    fontSize: 22
  },
  contenido: {
    padding: 20,
    flex: 1,
  },
  hero: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#6DD3B5',
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  heading:{
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginVertical: 10,
  },
  texto:{
    width: '90%',
    fontSize: 16,
    fontWeight: '300'
  },
  contenedorBotones: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boton: {
    padding: 10, 
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  botonTexto: {
    textAlign: 'center',
    fontWeight: '300',
    textTransform: 'uppercase',
    fontSize: 14
  },
  encabezado: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '700'
  },
  span: {
    color: '#2FB18A'
  },
  categorias: {
    marginBottom: 5
  },
  contenedorFiltros: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    flexWrap: 'wrap'
  },
  botonFiltro: {
    padding: 2,
    backgroundColor: '#6DD3B5',
    margin: 5,
  },
  filtro: {
    fontWeight: 'bold',
    color: '#2FB18A',
    fontSize: 17,
  },  
  botonFiltroActive: {
    backgroundColor: '#2FB18A',
    padding: 2,
    margin: 5,
  },
  filtroText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actividades:{
    marginVertical: 20,
    height: '100%',
  },
  actividadesList: {
    marginVertical: 20
  }

})

export default Actividades