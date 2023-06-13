import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/Stack/Models";
import api from "../../services/api";

interface Livro {
  autor: string;
  dataPublicacao: string;
  genero: string;
  id: number;
  titulo: string;
}

const List = () => {
  const navigation = useNavigation<propsStack>();
  const [livros, setLivros] = useState<Livro[]>([]);

  const handleListPress = async () => {
    try {
      const response = await api.get<Livro[]>("/listarLivros");
      setLivros(response.data);
    } catch (error) {
      console.log("Erro ao listar livros:", error);
    }
  };

  const handleDeletarLivro = async (livroId: number) => {
    try {
      await api.delete(`/livros`, { data: { idLivro: livroId } });
      handleListPress();
    } catch (error) {
      console.log("Erro ao deletar livro:", error);
    }
  };

  useEffect(() => {
    handleListPress();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleListPress();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginTop: 100 }]}>Livros Cadastrados</Text>

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>Título: {item.titulo}</Text>
            <Text style={styles.bookInfo}>Autor: {item.autor}</Text>
            <Text style={styles.bookInfo}>Data de Publicação: {item.dataPublicacao}</Text>
            <Text style={styles.bookInfo}>Gênero: {item.genero}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletarLivro(item.id)}>
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
  },
  bookContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 1,
    width: 90,
    padding: 6,
    backgroundColor: "#c24c4e",
    borderRadius: 4,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
    
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14
  },
  button: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#BDBDBD",
    borderRadius: 4,
  }
});

export default List;
