import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from "react-native";
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

const Search = () => {
  const navigation = useNavigation<propsStack>();
  const [termoBusca, setTermoBusca] = useState("");
  const [livrosEncontrados, setLivrosEncontrados] = useState<Livro[]>([]);

  const handleBuscarPress = async () => {
    if (termoBusca === "") {
      setLivrosEncontrados([]);
      return;
    }

    try {
      const response = await api.post("/buscarLivros", { termoBusca });
      const livrosFiltrados = response.data.livrosEncontrados.filter((livro: Livro) => {
        const tituloMinusculo = livro.titulo.toLowerCase();
        const autorMinusculo = livro.autor.toLowerCase();
        const termoMinusculo = termoBusca.toLowerCase();

        if (tituloMinusculo.startsWith(termoMinusculo) || autorMinusculo.startsWith(termoMinusculo)) {
          return true;
        }

        for (let i = 0; i < termoMinusculo.length - 1; i++) {
          if (tituloMinusculo.includes(termoMinusculo[i] + termoMinusculo[i + 1]) ||
              autorMinusculo.includes(termoMinusculo[i] + termoMinusculo[i + 1])) {
            return true;
          }
        }

        return false;
      });
      setLivrosEncontrados(livrosFiltrados);
    } catch (error) {
      console.log("Erro ao buscar livros:", error);
    }
  };

  return (
    <View style={{ flexDirection: "column", alignItems: 'center', justifyContent: "center", flex: 1 }}>
      <Text style={[styles.title, { marginTop: 100 }]}>Busca pelo Título ou Autor</Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TextInput
          style={{ marginTop: 12, padding: 6, backgroundColor: "#FFFFFF", width: 130, borderRadius: 8 }}
          placeholder="Digite o termo"
          value={termoBusca}
          onChangeText={setTermoBusca}
        />

        <TouchableOpacity
          style={{ marginTop: 12, padding: 9, backgroundColor: "#0099FF", borderRadius: 8, marginLeft: 8 }}
          onPress={handleBuscarPress}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Renderizar a lista de livros encontrados */}
      {livrosEncontrados.length === 0 ? (
        <Text>Nenhum livro ou autor encontrado.</Text>
      ) : (
      <FlatList
        data={livrosEncontrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>Título: {item.titulo}</Text>
            <Text style={styles.bookInfo}>Autor: {item.autor}</Text>
            <Text style={styles.bookInfo}>Data de Publicação: {item.dataPublicacao}</Text>
            <Text style={styles.bookInfo}>Gênero: {item.genero}</Text>
          </View>
        )}
      />
      )}
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
    marginBottom: 20,
  },
  input: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#FFFFFF",
    width: 200,
    borderRadius: 4,
  },
  button: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#BDBDBD",
    borderRadius: 4,
  },
  buttonText: {
    color: "#FDFDFD",
    fontSize: 14,
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
  divider: {
    fontSize: 14,
  },
});

export default Search;
