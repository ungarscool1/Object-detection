import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Cam({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = React.useState(null);
  if (!permission) {
    // Camera permissions are still loading
    return <SafeAreaView />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={setCamera}>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
            camera.takePictureAsync({ onPictureSaved: (picture) => navigation.navigate('Result', { image: picture }), exif: false, imageType: 'png' });
          }}>
            <Ionicons name="radio-button-on-outline" size={100} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
