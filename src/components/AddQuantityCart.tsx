import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { View } from 'react-native'

import constColor from '../constants/color';
import { stylesGral } from '../theme/generalTheme';
import { ProductContext } from '../context/ProductContext';



export interface Props {

    selectedQuantity: string | undefined,
    onChange: (value: string) => void | undefined,
}



export const AddQuantityCart = ({ selectedQuantity, onChange}: Props) => {

    const { quantityReposity } = useContext(ProductContext)
    const [quantity, setQuantity] = useState<string[]>();


    useEffect(() => {

        let arrQuantity: string[] = [];

        for( let i=1; i <= quantityReposity; i++){
            arrQuantity.push(i.toString())
        }

        setQuantity(arrQuantity);
    }, []);


  return (
    
    <View style={{
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: constColor.green,
        width: '50%',
      }}>
        <Picker
            selectedValue={ selectedQuantity }
            onValueChange={onChange}
            mode='dialog'
            style={{ ...stylesGral.glPicker, marginLeft: 50}}
        >
            { quantity?.map((item, index) => (
                <Picker.Item key={ index } label={ item.toString() } value={ item } />
            ))}
        </Picker>
    </View>
  )
}
