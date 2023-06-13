import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { propsStack } from "../../routes/Stack/Models";

const Home = () => {
  const navigation = useNavigation<propsStack>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bem-vindo ao nosso aplicativo de biblioteca!</Text>

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
    fontSize: 20,
    marginBottom: 20,
    alignItems: "center",
    textAlign: "center",
    lineHeight: 28,
  
  },
  button: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#BDBDBD",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Home;
