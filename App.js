import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function App() {

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const [marker, setMarker] = useState({
    latitude: 60.201373,
    longitude: 24.934041
  });

  const [place, setPlace] = useState('Haaga-helia');

  const key = 'j1yykIvGz1npFySWdG8Fr6nMCZi8VY8C';

  const fetchLocation = () => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${place}`)
      .then(response => response.json())
      .then(data => {
        location = data.results[0].locations[0]
        setRegion(
          {
            latitude: location.latLng.lat,
            longitude: location.latLng.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
          }
        );
        setMarker(
          {
            latitude: location.latLng.lat,
            longitude: location.latLng.lng,
          }
        );
      })
      .catch(error => { Alert.alert('Error', error) });

  }
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, height: '100%', width: '100%' }}
        region={region}>
        <Marker
          coordinate={marker}
          title={place}>
        </Marker>
      </MapView>
      <TextInput
        style={{ width: '100%', height: '5%', borderColor: 'gray', borderWidth: 1 }}
        placeholder='Haaga-helia'
        placeholderTextColor='grey'
        onChangeTex={text => setPlace(text)}>
      </TextInput>
      <Button
        style={{ width: '100%', height: '5%' }}
        onPress={fetchLocation}
        title='Show'>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: '100%'
  }
});
