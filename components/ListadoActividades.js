import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Platform, StyleSheet, Pressable, FlatList} from 'react-native';
import Actividad from './Actividad';

function ListadoActividades({actividades, horizontal = true}) {
    console.log(actividades.length);
  return (
    <FlatList
        data={actividades}
        keyExtractor={ (actividad) => (actividad._id.toString()) }
        renderItem={ ({item}) => (
        <Actividad actividad={item}/>
        )}
        // horizontal={horizontal}
    />
  )
}

export default ListadoActividades