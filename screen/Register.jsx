import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Pressable} from 'react-native';
import { register } from '../src/backend';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function App({ navigation }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const validateInput = async () => {
    if (firstName === "") {
      alert("Please enter your first name");
      return;
    }
    if (lastName === "") {
      alert("Please enter your last name");
      return;
    }
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    if (confirmPassword === "") {
      alert("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (dateOfBirth === "") {
      alert("Please enter your date of birth");
      return;
    }
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await userCredential.user.updateProfile({ displayName: name });
  };
  const dateHelper = (input) => {
    let text = input.nativeEvent.text;
    if (text.match(/^[0-1]\d$/) !== null && !text.match(/^1[3-9]$/)) {
      setDateOfBirth(text + "-")
      return text + "-";
    }
    if (text.match(/^[0-1]\d-[0-3]\d$/) !== null && !text.match(/^[0-1]\d-3[2-9]$/)) {
      setDateOfBirth(text + "-");
      return text + "-";
    }
    setDateOfBirth(text)
    return text;
  };
  return (
    <SafeAreaView>
      <View style={{
        marginTop: 60,
        marginLeft: 40,
        marginRight: 40,
      }}>
        <Text style={styles.title}>Inscription</Text>
        <TextInput style={styles.input} value={firstName} onChange={setFirstName} placeholder="Prénom" />
        <TextInput style={styles.input} value={lastName} onChange={setLastName} placeholder="Nom" />
        <TextInput style={styles.input} value={dateOfBirth} onChange={dateHelper} keyboardType={'number-pad'} autoComplete={'birthdate-full'} placeholder="Date de naissance" />
        <TextInput style={styles.input} value={email} onChange={setEmail} placeholder="Email" autoCapitalize='none' autoCorrect={false} />
        <TextInput style={styles.input} value={password} onChange={setPassword} placeholder="Mot de passe" secureTextEntry={true} />
        <TextInput style={styles.input} value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirmer le mot de passe" secureTextEntry={true} />
        <Pressable onPress={() => {
          validateInput();
        }}>
          <Text style={styles.button}>S'inscrire</Text>
        </Pressable>
        <Pressable onPress={() => {
          navigation.navigate('Login');
        }}>
          <Text style={styles.login}>Se connecter</Text>
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
  login: {
    marginTop: 10,
    textAlign: 'center',
    color: '#28536B',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25
  }
});