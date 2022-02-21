import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RNPickerSelect  from 'react-native-picker-select';

import { styleProduct } from '../theme/productTheme';
import { stylesGral } from '../theme/generalTheme';
import constColor from '../constants/color';



export const AsistenSearch = () => {

    const [tipo, setTipo] = useState('');
    const [familia, setFamilia] = useState('');
    const [autor, setAutor] = useState('');
    const [titulo, setTitulo] = useState('');


    const placeholder = {
        label: 'Select a sport...',
        value: null,
        color: '#9EA0A4',
      };

      const sports = [
        {
          label: 'Football',
          value: 'football',
        },
        {
          label: 'Baseball',
          value: 'baseball',
        },
        {
          label: 'Hockey',
          value: 'hockey',
        },
      ];

  return (
    <>

        <View style={ styleProduct.containerPicker }>
            <Text style={ stylesGral.glLabel }>Seleccione Tipo</Text>
            <RNPickerSelect
            key={1}
            placeholder={placeholder}
            items={sports}
            onValueChange={value => setTipo(value)}
            style={pickerSelectStyles}
            value={tipo}
          />
        </View>
        <View style={ styleProduct.containerPicker }>
            <Text style={ stylesGral.glLabel }>Seleccione Familia</Text>
            <RNPickerSelect
            key={2}
            placeholder={placeholder}
            items={sports}
            onValueChange={value => setFamilia(value)}
            style={pickerSelectStyles}
            value={familia}
          />
        </View>
        <View style={ styleProduct.containerPicker }>
            <Text style={ stylesGral.glLabel }>Seleccione Autor</Text>
            <RNPickerSelect
            key={3}
            placeholder={placeholder}
            items={sports}
            onValueChange={value => setAutor(value)}
            style={pickerSelectStyles}
            value={autor}
          />
        </View>
        <View style={ styleProduct.containerPicker }>
            <Text style={ stylesGral.glLabel }>Seleccione Titulo</Text>
            <RNPickerSelect
            key={4}
            placeholder={placeholder}
            items={sports}
            onValueChange={value => setTitulo(value)}
            style={pickerSelectStyles}
            value={titulo}
          />
        </View>
    </>
  )
}

const pickerSelectStyles = StyleSheet.create({

    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 13,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: constColor.grey,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
