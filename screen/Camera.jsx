import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView, Pressable, Linking } from "react-native";
import { Camera, CameraType } from 'expo-camera';

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
          <Pressable style={styles.button} onPress={() => {
            camera.takePictureAsync({ onPictureSaved: (picture) => navigation.navigate('Result', { image: picture.base64 }), base64: true, exif: false, imageType: 'png' });
          }}>
            <Text style={styles.text}> Take </Text>
          </Pressable>
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
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
