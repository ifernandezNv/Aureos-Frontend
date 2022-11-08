import { View, Text, Modal, Pressable, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import useAureos from '../hooks/useAureos'

const ModalFormulario = ({modal, setModal}) => {


  function cerrarModal(){
    setModal(!modal);
  }

  return (
    <View
      style={{flex: 1, backgroundColor: '#f8f8f8', marginHorizontal: '10%', marginVertical: 30}}
    >
      <Modal
        visible={modal}
        transparent={false}
        animationType='slide'
        // presentationStyle='formSheet'
        
      >
        <View
          style={{
            flex: 1, 
            backgroundColor: '#fff', 
            marginHorizontal: '10%', 
            marginVertical: 30, 
            borderRadius: 10, 
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            
            elevation: 8,
          }}
        >
          <Pressable onPress={ ()=>cerrarModal()} style={styles.botonCerrar}>
            <Text style={styles.botonCerrarTexto}>X</Text>
          </Pressable>
          <View>
            <Text style={styles.encabezado}>Crea tus <Text style={styles.span}>Actividades</Text></Text>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre: </Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre: </Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.campo}>
              <Text style={styles.label}>Nombre: </Text>
              <TextInput style={styles.input} />
            </View>
          </View>
          
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 'auto',
    borderRadius: 10,
  },
  botonCerrar: {
    backgroundColor: '#6DD3B5',
    width: '10%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    marginLeft: '90%'
  },
  botonCerrarTexto: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
  },
  encabezado: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  span: {
    color: '#2FB18A',
    fontWeight: '700'
  },
})

export default ModalFormulario