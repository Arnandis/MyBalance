import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//nia q cambiar les imatges, y posar o iconos o totes les imatges de un colos similar y be el fondo. i mes grans.
const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");

  // Recuperar el nombre del usuario del AsyncStorage (si es necesario) en un futuro para poner el nombre del usuario
  useEffect(() => {
    const getUserName = async () => {
      const name = await AsyncStorage.getItem("userName");
      if (name) {
        setUserName(name);
      }
    };
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      {/* Texto de bienvenida con el nombre si lo deseas o solo MyBalance */}
      <Text style={styles.welcomeText}>¡Bienvenido a MyBalance!</Text>

      <View style={styles.iconContainer}>
        {/* Icono para Finanzas */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("FinanzasScreen")}
        >
          <Image
            style={styles.icon}
            source={require("/home/pau/Escritorio/MyBalance/frontend/assets/finanzas.png")}
          />
          <Text style={styles.iconText}>Finanzas</Text>
        </TouchableOpacity>

        {/* Icono para Tiempo */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("TiempoScreen")}
        >
          <Image
            style={styles.icon}
            source={require("/home/pau/Escritorio/MyBalance/frontend/assets/tiempo.png")}
          />
          <Text style={styles.iconText}>Tiempo</Text>
        </TouchableOpacity>

        {/* Icono para Logros y Objetivos */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("LogrosScreen")}
        >
          <Image
            style={styles.icon}
            source={require("/home/pau/Escritorio/MyBalance/frontend/assets/logros.png")}
          />
          <Text style={styles.iconText}>Logros</Text>
        </TouchableOpacity>

        {/* Icono para Ranking */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("RankingScreen")}
        >
          <Image
            style={styles.icon}
            source={require("/home/pau/Escritorio/MyBalance/frontend/assets/ranking.png")}
          />
          <Text style={styles.iconText}>Ranking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
  iconText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
