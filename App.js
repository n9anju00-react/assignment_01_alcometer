// Suunniteltu iOS:lle ja testattu iPhone 8
// Tekijä: Juha-Pekka Angeria TIK20KM

import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm from 'react-native-simple-radio-button';


export default function App() {
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male');
  const [promilles, setPromilles] = useState(0);
  const [bottlesOpen, setBottlesOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  // toimii toisen alasvetovalikon sulkijana, kun toinen aukaistaan
  const onBottlesOpen = useCallback(() => {
    setTimeOpen(false);
  }, []);
  // toimii toisen alasvetovalikon sulkijana, kun toinen aukaistaan
  const onTimeOpen = useCallback(() => {
    setBottlesOpen(false);
  }, []);

  const [bottlesValue, setBottlesValue] = useState(3);
  const [bottlesSelected, setBottlesSelected] = useState([
    {label: '1 bottle', value: 1},
    {label: '2 bottles', value: 2},
    {label: '3 bottles', value: 3},
    {label: '4 bottles', value: 4},
    {label: '5 bottles', value: 5},
    {label: '6 bottles', value: 6},
    {label: '7 bottles', value: 7},
    {label: '8 bottles', value: 8},
    {label: '9 bottles', value: 9},
    {label: '10 bottles', value: 10},
    {label: '11 bottles', value: 11},
    {label: '12 bottles', value: 12}
  ]);

  const [timeValue, setTimeValue] = useState(2);
  const [timeSelected, setTimeSelected] = useState([
    {label: '1 hour', value: 1},
    {label: '2 hours', value: 2},
    {label: '3 hours', value: 3},
    {label: '4 hours', value: 4},
    {label: '5 hours', value: 5},
    {label: '6 hours', value: 6},
    {label: '7 hours', value: 7},
    {label: '8 hours', value: 8},
    {label: '9 hours', value: 9},
    {label: '10 hours', value: 10},
    {label: '11 hours', value: 11},
    {label: '12 hours', value: 12}
  ]);

  const genders = [
    {label: 'Male', value: 'male' },
    {label: 'Female', value: 'female' }
  ];

  function calculate() {
    if (weight <= 0 || isNaN(weight.replace(',','.'))) {
      alert('Please Enter Your Weight in Kilograms!');
      return;
    }
    let weightCorrected = weight.replace(',','.');
    let result = 0;
    let litres = bottlesValue * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weightCorrected / 10;
    let gramsLeft = grams - burning * timeValue;
    if (gender === 'male') {
      result = gramsLeft / (weightCorrected * 0.7);
    }
    else {
      result = gramsLeft / (weightCorrected * 0.6);
    }
    if (result < 0) {
      result = 0;
    }
    setPromilles(result);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.header}>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)}
          placeholder="in kilograms"
          keyboardType='numeric'
          maxLength={6}>
        </TextInput>
        <Text style={styles.header}>Bottles</Text>
        <View style={{zIndex: 2000}}>
          <DropDownPicker
            open={bottlesOpen}
            onOpen={onBottlesOpen}
            value={bottlesValue}
            items={bottlesSelected}
            setOpen={setBottlesOpen}
            setValue={setBottlesValue}
            setItems={setBottlesSelected}
          />
        </View>
        <Text style={styles.header}>Time</Text>
        <View style={{zIndex: 1000}}>
          <DropDownPicker
            open={timeOpen}
            onOpen={onTimeOpen}
            value={timeValue}
            items={timeSelected}
            setOpen={setTimeOpen}
            setValue={setTimeValue}
            setItems={setTimeSelected}
          />
        </View>
        <Text style={styles.header}>Gender</Text>
        <RadioForm
          style={styles.radio}
          buttonSize = {10}
          radio_props={genders}
          initial={0}
          onPress={(value) => {setGender(value)}}
        />
        <Text style={styles.header}>Promilles</Text>
        <Text>{promilles.toFixed(2)}</Text>
        <Pressable
            style={styles.button}
            onPress={calculate}>
          <Text style={styles.btnText}>Calculate</Text>
        </Pressable>
      </View>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    margin: 10,
  },
  header: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    marginLeft: 10,
  },
  radio: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5.
  },
  button: {
    width: 150,
    marginTop: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 250,
    marginBottom: 20,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  }
});