import React from "react";
import { ScrollView, Text, StyleSheet, Image, TouchableOpacity, View, RefreshControl } from "react-native";
import * as SecureStore from 'expo-secure-store';

const get_results = async () => {
  try {
    const data = await SecureStore.getItemAsync('results');
    const results = data ? JSON.parse(data) : [];
    return results;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default function App({ route, navigation }) {
  const [results, setResults] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refreshResults = React.useCallback(() => {
    setIsRefreshing(true);
    get_results().then((results) => {
      setResults(results);
      setIsRefreshing(false);
    });
  }, [setResults, setIsRefreshing]);

  React.useEffect(() => {
    refreshResults();
  }, []);

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={isRefreshing} onRefresh={refreshResults} />
    }>
      {results.map((result, index) => {
        return (
          <TouchableOpacity key={index} style={styles.result} onPress={() => {
            navigation.navigate('Result', { image: result.image, obj: result.result });
          }}>
            <Image source={{uri: result.image.uri}} style={{
                height: 100, width: 100
              }} resizeMode="contain" />
              <View style={styles.resultInfo}>
                <Text style={styles.resultText}>{result.result[0].detectedClass[0].toUpperCase() + result.result[0].detectedClass.substring(1)} ({result.result[0].confidenceInClass}%)</Text>
                <Text style={styles.dateText}>{result.date}</Text>
              </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  resultText: {
    fontSize: 20,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 10,
    marginLeft: 10,
  },
  resultInfo: {
    flexDirection: 'column',
  }
});