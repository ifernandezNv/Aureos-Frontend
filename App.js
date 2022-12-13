import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Inicio from './views/Inicio';
import CrearCuenta from './views/CrearCuenta';
import IniciarSesion from './views/IniciarSesion';
import OlvidePassword from './views/OlvidePassword';
import Formulario from './views/Formulario';
import Terminos from './views/Terminos';
import Actividades from './views/Actividades';
import ActividadesRecomendadas from './views/ActividadesRecomendadas';
import ChatView from './views/ChatView';
import Perfil from './views/Perfil';
import VerActividad from './views/VerActividad';
import Videos from './views/Videos';

import { AureosProvider } from './context/AureosContext';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#6DD3B5',
    secondary: '#fff'
  }
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AureosProvider>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <Stack.Navigator
              initialRouteName='Inicio'
              screenOptions={{
                headerStyle: {
                  borderColor: '#fff',
                },
                headerTitleStyle:{
                  fontSize: 20,
                }
              }}
            >
              {/* Rutas de inicio y creación de cuentas */}
              <Stack.Screen
                name='Inicio'
                component={Inicio}
                options={{
                  title: ' '
                }}
              />
              <Stack.Screen
                name='Crear Cuenta'
                component={CrearCuenta}
              />
              <Stack.Screen
                name='Iniciar Sesion'
                component={IniciarSesion}
              />
              <Stack.Screen
                name='Olvide'
                component={OlvidePassword}
              />
              
              <Stack.Screen
                name='Terminos'
                component={Terminos}
                options={{
                  title: 'Términos y condiciones'
                }}
              />
              {/* Formulario de colocación */}

              <Stack.Screen
                name='Formulario'
                component={Formulario}
                options={{
                  title: 'Formulario Guía'
                }}
              />

              <Stack.Screen
                name='Chat'
                component={ChatView}
                options={{
                  title: 'Platica con un profesional',
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='Actividades'
                component={Actividades}
                options={{
                  title: 'Recursos',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='Actividades Recomendadas'
                component={ActividadesRecomendadas}
                options={{
                  // title: 'Inicio',
                  headerShown:false
                }}
              />

              <Stack.Screen
                name='Perfil'
                component={Perfil}
                options={{
                  title: 'Perfil',
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='Ver Actividad'
                component={VerActividad}
                options={{
                  title: ' ',
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='Videos'
                component={Videos}
                options={{
                  title: ' ',
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </PaperProvider>  
        </NavigationContainer>
      </AureosProvider>
    </GestureHandlerRootView>
  );
}
