import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, Image, ImageBackground } from "react-native";
import Tflite from 'tflite-react-native';

export default function App({ route, navigation }) {
  const { image } = route.params;
  const imageWidth = image.width;
  const imageHeight = image.height;
  const [object, setObject] = React.useState(null);
  let tflite = new Tflite();
  if (!object) {
    console.log(image);
    tflite.loadModel({
      model: 'models/ssd_mobilenet.tflite',// required
      labels: 'models/ssd_mobilenet.txt',  // required
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
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: image.uri}} style={{
          height: '100%', width: '100%'
        }} resizeMode="contain" /> 
      {object && object.map((item, index) => {
          let left = item["rect"]["y"] * imageWidth / 10;
          let top = item["rect"]["x"] * imageHeight / 10;
          let width = item["rect"]["h"] * imageWidth;
          let height = item["rect"]["w"] * imageHeight / 10;
          return (
            <View key={index} style={[styles.box, { top, left, width, height }]}>
              <Text style={{ color: 'white', backgroundColor: 'blue' }}>
                {item.detectedClass + " " + (item.confidenceInClass * 100).toFixed(0) + "%"}
              </Text>
            </View>
          )
        })}
    </SafeAreaView>
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
  }
});