import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { stylesGral } from '../../theme/generalTheme';

interface Props {
    onChange: (value:string) => void,
    value: string
    reset: () => void,
}

export const ZonaReparto = ( { value, onChange, reset }: Props ) => {
  

    return (
        
        <Input
            placeholder='Calle N°1'
            keyboardType='default'
            value={ value }
            onChangeText={  onChange }
            rightIcon={
            <Icon 
                tvParallaxProperties={undefined}
                type='ionicon'
                name={ 'close-circle-outline'}
                onPress={ reset }
            />
            }
        />
        
    )
}
