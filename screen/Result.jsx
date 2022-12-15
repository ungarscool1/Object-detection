import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, Pressable, Image } from "react-native";
import Tflite from 'tflite-react-native';

export default function App({ route, navigation }) {
  const { image } = route.params;
  const [object, setObject] = React.useState(null);
  let tflite = new Tflite();
  tflite.detectObjectOnImage({
    path: `data:image/png;base64,${image}`,
    model: 'SSDMobileNet',
    imageMean: 127.5,
    imageStd: 127.5,
    threshold: 0.3,       // defaults to 0.1
    numResultsPerClass: 2,// defaults to 5
  },
  (err, res) => {
    if(err)
      console.log(err);
    else {
      console.log(res);
      setObject(res);
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <Image source={`data:image/png;base64,${image}`} style={styles.logo} />
    </SafeAreaView>
  );
}