import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Tflite from 'tflite-react-native';
import * as SecureStore from 'expo-secure-store';

const save_result = async (image, result) => {
  const data = await SecureStore.getItemAsync('results');
  const results = data ? JSON.parse(data) : [];
  results.push({
    image,
    result,
    date: new Date()
  });
  console.log(results[results.length - 1])
  await SecureStore.setItemAsync('results', JSON.stringify(results));
}

export default function App({ route, navigation }) {
  const { image, obj } = route.params;
  const imageWidth = Dimensions.get('window').width;
  const imageHeight = Dimensions.get('window').height;
  const [object, setObject] = React.useState(null);
  let tflite = new Tflite();
  if (!object && !obj) {
    tflite.loadModel({
      model: 'models/ssd_mobilenet.tflite',
      labels: 'models/ssd_mobilenet.txt',
    },
    (err, res) => {
      if(err)
        console.log(err);
      else
        console.log(res);
    });
    tflite.detectObjectOnImage({
      path: `${image.uri}`,
      model: 'SSDMobileNet',
      imageMean: 127.5,
      imageStd: 127.5,
      threshold: 0.3,
      numResultsPerClass: 2,
    },
    (err, res) => {
      if(err)
        console.log(err);
      else {
        console.log(res);
        save_result(image, res);
        setObject(res);
      }
    });
  } else if (!object && obj) {
    setObject(obj);
  }
  return (
    <View style={styles.container}>
      <Image source={{uri: image.uri}} style={{
          height: '100%', width: '100%'
        }} resizeMode="contain" /> 
      {object && object.map((item, index) => {
          let left = item["rect"]["y"] * imageWidth;
          let top = item["rect"]["x"] * imageHeight;
          let width = item["rect"]["h"] * imageWidth;
          let height = item["rect"]["w"] * imageHeight;
          return (
            <View key={index} style={[styles.box, { top, left, width, height }]}>
              <Text style={{ color: 'white', backgroundColor: 'blue' }}>
                {item.detectedClass + " " + (item.confidenceInClass * 100).toFixed(0) + "%"}
              </Text>
            </View>
          )
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '100%',
    height: '100%'
  },
  box: {
    position: 'absolute',
    borderColor: 'blue',
    borderWidth: 2,
  },
  boxes: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  footer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});