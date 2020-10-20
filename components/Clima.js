import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { clima } from "../helpers/clima";

export const Clima = ({ resultado }) => {
  const { name, main } = resultado;
  if (!name) return null;
  const icon = resultado.weather[0].icon;
  const imageUrl = `https://openweathermap.org/img/w/${icon}.png`;
  const { temp, temp_min, temp_max } = main;



  return (
    <View style={styles.clima}>
      <Text style={[styles.texto, styles.actual]}>
        {clima(temp)} <Text style={styles.temperatura}>℃ </Text>
        <Image source={{ uri: imageUrl }} style={{ width: 66, height: 58 }} />
      </Text>
      <View style={styles.temperaturas}>
        <Text>
          <Text style={styles.texto}>
            Min
            <Text style={styles.temperatura}> {clima(temp_min)} ℃ </Text>
          </Text>
        </Text>
        <Text>
          <Text style={styles.texto}>
            Max
            <Text style={styles.temperatura}> {clima(temp_max)} ℃ </Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
  },
  temperatura: {
    fontSize: 24,
    fontWeight: "bold",
  },
  texto: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: "bold",
  },
  temperaturas: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
