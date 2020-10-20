import React, { Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Clima } from "./components/Clima";
import { Formulario } from "./components/Formulario";
import { clima } from "./helpers/clima";

export default function App() {
  const [busqueda, setBusqueda] = useState({ pais: "", ciudad: "" });
  const { pais, ciudad } = busqueda;
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState("rgb(71,149,212)");
  useEffect(() => {
    if (consultar) {
      const consultarApi = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=04a755a93b6f68c1ff4134e7c9d155b4`;
        try {
          const res = await fetch(url);
          const respuesta = await res.json();
          setResultado(respuesta);
          setConsultar(false);
          
            const { temp } = respuesta.main;
            const actual = clima(temp);

            if (actual < 10) {
              setBgColor("rgb(105,108,149)");
            } else if (actual >= 10 && actual < 25) {
              setBgColor("rgb(71,149,212)");
            } else {
              setBgColor("rgb(178,28,61)");
            }
        } catch (error) {
          console.error(error);
          Alert.alert(
            "Error",
            "No hay resultado intenta con otro país o ciudad",
            [{ text: "Confirmar" }]
          );
        }
      };
      consultarApi();
    }
  }, [consultar]);

  useEffect(() => {
    // if (Object.keys.length !== 0) {
    // }
  }, []);

  const backgroundColor = { backgroundColor: bgColor };

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[backgroundColor, styles.app]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});
