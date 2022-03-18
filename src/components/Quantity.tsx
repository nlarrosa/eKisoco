import React, { useContext, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'



type Props = {
    initValue: number,
    max: number,
    buttonColor: string,
}


export const Quantity = ({ initValue, max, buttonColor }:Props ) => {
 

    const [quantity, setQuantity] = useState<number>(initValue);


    const validateQuantityAssigned = (cant: number) => {

        if(cant <= 1){
            setQuantity(1);
            return;
        }

        if(cant > max){
            setQuantity(max);
            return;
        }

        setQuantity(cant);

    }

 
    return (
        
        <View style={{ flex: 1 }}>
            <Text >Cantidad</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                <Button
                    title="-"
                    onPress={ () => validateQuantityAssigned(quantity - 1) }
                    titleStyle={{ fontWeight: '800' }}
                    buttonStyle={{
                        backgroundColor: buttonColor,
                        height: 40,
                    }}
                    containerStyle={{
                        justifyContent: 'center',
                        width: 45,
                        height: 45,
                        marginVertical: 10,
                        // borderWidth: 2
                    }}
                />
                <TextInput value={ quantity.toString() }
                    textAlign='center'
                    keyboardType='numeric'
                    autoCapitalize='none'
                    autoCompleteType='off'
                    editable={ true }
                    style={{ 
                        borderWidth: 1, 
                        borderColor: 'green', 
                        width: 45, 
                        height: 40,
                        fontSize: 17,
                        fontWeight: 'bold'
                    }}
                    />
                <Button
                    title="+"
                    onPress={ () => validateQuantityAssigned(quantity + 1) }
                    titleStyle={{ fontWeight: '900' }}
                    buttonStyle={{
                        backgroundColor: buttonColor,
                        height: 40,
                    }}
                    containerStyle={{
                        justifyContent: 'center',
                        width: 45,
                        height: 45,
                        marginVertical: 10,
                        // borderWidth: 2
                    }}
                    />
            </View>
        </View>
    )
}
