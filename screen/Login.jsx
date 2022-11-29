import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Pressable} from 'react-native';
import { login } from '../src/backend';

export default function App({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const validateInput = () => {
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    login(email, password);
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
        <Pressable onPress={() => {
          navigation.navigate('Register');
        }}>
          <Text style={styles.register}>S'inscrire</Text>
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
  },
  register: {
    marginTop: 10,
    padding: 25,
    textAlign: 'center',
    color: '#28536B',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25
  }
});