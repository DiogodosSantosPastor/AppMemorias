import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Pressable, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function NovaMemoria() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const router = useRouter();

  const solicitarPermissao = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Necessária',
        'Precisamos da sua permissão para acessar as imagens do dispositivo.'
      );
      return false;
    }
    return true;
  };

  const selecionarImagem = async () => {
    const permissaoConcedida = await solicitarPermissao();
    if (!permissaoConcedida) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const adicionarMemoria = async () => {
    const novaMemoria = { titulo, descricao, imagem };
    const memorias = JSON.parse(await AsyncStorage.getItem('memorias')) || [];
    memorias.push(novaMemoria);
    await AsyncStorage.setItem('memorias', JSON.stringify(memorias));
    router.push('/'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nova Memória</Text>
      </View>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
      />
      <Button title="Selecionar Imagem" onPress={selecionarImagem} />
      {imagem && <Image source={{ uri: imagem }} style={styles.image} />}
      <Pressable onPress={adicionarMemoria} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Memória</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/')} style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    padding: 20,
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
  label: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#3579E6',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#3579E6',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
