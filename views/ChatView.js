import {StreamChat} from 'stream-chat';
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput} from 'stream-chat-expo';

import React, { useEffect, useState } from 'react';

import {View, Text, StyleSheet, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import useAureos from '../hooks/useAureos';
import Navegacion from '../components/Navegacion';


const client = StreamChat.getInstance(process.env.STREAM_KEY);

function ChatView({route, navigation}) {
  const {usuario, token} = useAureos();
  const [conectado, setConectado] = useState(false);
  const [canalSeleccionado, setCanalSeleccionado] = useState({});
  const [canales, setCanales] = useState([]);
  const [filtro, setFiltro] = useState({member_count: { $eq: 2 }});
  const [paciente, setPaciente] = useState('')
  // let filtro = {};
  let channel = '';


  useEffect(()=>{
    conectarCliente();
    
    async function conectarCliente(){
      const cliente = {
        id: usuario._id,
        nombre: usuario.nombre,
      }
      try {
        await client.connectUser(cliente, usuario.tokenStream); 
        channel = client.channel('messaging', `${cliente.id}`, {
          name: `Sesión de ${cliente.nombre}`,
        });
        if(usuario.tipo === 'usuario'){
          channel.addMembers(['6359c3d768deee0184746172']);
        }
        // filtro = {members: {$in : [usuario._id]}};
        const canalesPertenecientes = await client.queryChannels({members: {$in : [usuario._id]}});
        setCanales(canalesPertenecientes);
        await channel.create();
      
        setConectado(true);
        
      } catch (error) {
        console.log(error); 
      }
    }
    return () => client.disconnectUser();
  },[]);

  function salirChat(){
    client.disconnectUser();
    setCanalSeleccionado({});
  }

  async function irAlCanal(canal){
    setCanalSeleccionado(canal);
  }

  return (
    <OverlayProvider style={{flex: 1}}>
      <Chat client={client}>
        { conectado && (
          <>
            {Object.keys(canalSeleccionado).length > 0 ? 
              <>
                <Channel channel={canalSeleccionado} style={{flex: 1}}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    paddingTop: 20,
                  }}>
                    <Button style={{backgroundColor: '#fff', margin: 0}} onPress={ ()=> setCanalSeleccionado({})}icon='arrow-left-bold'>Volver</Button>
                    <Text style={{color: '#fff'}}>No</Text>
                    {usuario.tipo === 'usuario' ? <Text>Carlos</Text> : <Text></Text> }
                    <Button onPress={ ()=> salirChat() }>Salir</Button>
                  </View>
                  
                  <MessageList style={{flex: 1}}/>
                  <MessageInput/>
                </Channel>
                <Navegacion visible={false}/>
              </>
            : 
              <>
                <View style={styles.tituloChatlist}>
                  <Text style={styles.headingList}>Chats a los que perteneces</Text>
                </View>
                <ChannelList filters={filtro}  onSelect={irAlCanal}/>
                <Navegacion visible={true} usuario={usuario} token={token}/>
              </>
            }

          </>

        )}
      </Chat>
    </OverlayProvider>
    
  )
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    borderBottomWidth: .2,
    backgroundColor: '#fff'
  },
  headerHeading:{
    textAlign: 'center',
    fontWeight: '700',
    margin: 0,
    fontSize: 22
  },
  tituloChatlist:{
    paddingVertical: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: '#6DD3B5',
  },
  headingList: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff',

  }
  
})

export default ChatView