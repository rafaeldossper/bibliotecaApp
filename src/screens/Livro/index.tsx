import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

const Livro = () => {
  const navigation = useNavigation();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [genero, setGenero] = useState("");

  const handleAdicionarLivro = async () => {
    try {
      const body = {
        titulo,
        autor,
        dataPublicacao,
        genero,
      };

      const response = await api.post("/adicionarLivro", body);
      console.log("Livro adicionado:", response.data);

      // Limpar os campos após adicionar o livro
      setTitulo("");
      setAutor("");
      setDataPublicacao("");
      setGenero("");
    } catch (error) {
      console.log("Erro ao adicionar livro:", error);
    }
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Livro</Text>

      <Text>Título:</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text>Autor:</Text>
      <TextInput style={styles.input} value={autor} onChangeText={setAutor} />

      <Text>Data de Publicação:</Text>
      <TextInput style={styles.input} value={dataPublicacao} onChangeText={setDataPublicacao} />

      <Text>Gênero:</Text>
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} />

      <TouchableOpacity style={styles.button} onPress={handleAdicionarLivro}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   marginTop:100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {    
    fontSize: 18,
    marginBottom: 20,
  }  
  ,
  input: {
    marginTop: 4,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#FFFFFF",
    width: 200,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  
  },
  button: {
    width: 130,
    marginTop: 12,
    padding: 8,
    backgroundColor: "#0099FF",
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonText: {
    color:"#FDFDFD",
    fontSize: 16,
    
  },
});

export default Livro;
