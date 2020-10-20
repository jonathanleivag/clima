import { Picker } from "@react-native-community/picker";
import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Animated,
  Alert,
} from "react-native";

export const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
  const { pais, ciudad } = busqueda;

  const [animacionBoton] = useState(new Animated.Value(1));
  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const styleAnimacion = { transform: [{ scale: animacionBoton }] };
  const handlerOnPress = () => {
    if (ciudad.trim() === "" || pais.trim() === "") {
      Alert.alert("error", "Los campos son obligatorio", [
        { text: "Confirmar" },
      ]);
      return;
    }

    setConsultar(true);

  };
  return (
    <Fragment>
      <View style={styles.formulario}>
        <TextInput
          value={ciudad}
          onChangeText={(text) => setBusqueda({ ...busqueda, ciudad: text })}
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="#666"
        />
      </View>
      <View>
        <Picker
          selectedValue={pais}
          onValueChange={(text) => setBusqueda({ ...busqueda, pais: text })}
          itemStyle={{ height: 120, backgroundColor: "#fff" }}
        >
          <Picker.Item label="- Seleccione un país -" value="" />
          <Picker.Item label="Chile" value="CL" />
          <Picker.Item label="Estados Unidos" value="US" />
          <Picker.Item label="México" value="MX" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Perú" value="PE" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPressIn={animacionEntrada}
        onPressOut={animacionSalida}
        onPress={handlerOnPress}
      >
        <Animated.View style={[styles.btnBuscar, styleAnimacion]}>
          <Text style={styles.textoBuscar}>Buscar clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: "#fff",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
  },
  textoBuscar: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
  },
});
