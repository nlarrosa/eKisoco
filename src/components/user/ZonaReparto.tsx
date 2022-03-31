import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import { stylesGral } from '../../theme/generalTheme';

interface Props {
    inputStreet: { [key: string]: string};
}

export const ZonaReparto = (  ) => {
  
    const [street, setStreet] = useState<{ [key: string]: string}>({});

    useEffect(() => {

        setStreet({ 
            'Calle1': '',
            'Calle2': '',
            'Calle3': '',
            'Calle4': '',
            'Calle5': '',
            'Calle6': '',
            'Calle7': '',
            'Calle8': '',
            'Calle9': '',
            'Calle10': '',
        });
      
    }, []);
    
    
  
    return (
        
        <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Poligono / Zona de reparto</Text>
            { Object.entries(street).map( ([ key, calle]) => (
                <TextInput 
                key={ key }
                style={ stylesGral.glTextInputLine}
                placeholder='Ingrese hasta 10 calles'
                keyboardType='default'
                onChangeText={ (value) => console.log(value)}
                />
            ))}
        </View>
    )
}
