import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, Pressable, ImageBackground } from "react-native";
import Tflite from 'tflite-react-native';

export default function App({ route, navigation }) {
  const { image } = route.params;
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
      <ImageBackground source={{uri: image.uri}} style={styles.image}>
        {object && object.map((item, index) => {
          return (
            <View key={index} style={{position: 'absolute', top: image.height*item.rect.y, left: image.width*item.rect.x, width: item.rect.width, height: item.rect.height, borderWidth: 2, borderColor: 'red'}}>
              <Text style={{color: 'red'}}>{item.detectedClass}</Text>
            </View>
          )
        })}
      </ImageBackground>
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
});