import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

export default function Memorias() {
  const [memorias, setMemorias] = useState([]);

  const carregarMemorias = async () => {
    const memoriasSalvas = JSON.parse(await AsyncStorage.getItem('memorias')) || [];
    setMemorias(memoriasSalvas);
  };

  useEffect(() => {
    carregarMemorias();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Memórias</Text>
      </View>
      <FlatList
        data={memorias}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.memoria}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            {item.imagem && <Image source={{ uri: item.imagem }} style={styles.image} />}
          </View>
        )}
      />
      <Link href="./nova-memoria/nova-memoria" style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Nova Memória</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
  },
  header: {
    padding: 20,
    backgroundColor: '#3579E6',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  memoria: {
    marginTop: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: '#3579E6',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  descricao: {
    color: '#AAAAAA',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#3579E6',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
