import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Pressable} from 'react-native';

export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const validateInput = () => {
    // TODO: send the email and password to the server
  };
  return (
    <SafeAreaView>
      <View style={{
        marginTop: 60,
        marginLeft: 40,
        marginRight: 40,
      }}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput style={styles.input} value={email} onChange={setEmail} placeholder="Email" autoCapitalize='none' autoCorrect={false} />
        <TextInput style={styles.input} value={password} onChange={setPassword} placeholder="Mot de passe" secureTextEntry={true} />
        <Pressable onPress={() => {
          validateInput();
        }}>
          <Text style={styles.button}>Se connecter</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F0ED',
    color: '#000',
  },
  title: {
    fontSize: 42,
  },
  input: {
    height: 40,
    marginTop: 10,
    borderBottomColor: '#7EA8BE',
    borderBottomWidth: 1
  },
  button: {
    marginTop: 10,
    backgroundColor: '#28536B',
    padding: 25,
    textAlign: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    color: '#fff',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25
  }
});