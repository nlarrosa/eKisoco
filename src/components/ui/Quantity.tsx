import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { CartContext } from '../../context/CartContext';




type Props = {
    initValue: number,
    max: number,
    buttonColor: string,
    title: string | null,
    productId: string,
    cartAction?: boolean,
}


export const Quantity = ({ initValue, max, buttonColor, title, productId, cartAction=false }:Props ) => {
 

    const { addQuantityProduct }  = useContext(CartContext);
    const [ counter, setCounter ] = useState<number>(0);


    useEffect(() => {
        setCounter(initValue);
    },[]);



    const increaseBy = ( value: number ) => {

        const newValue =  Math.min(max, Math.max( counter + value, 1 ))
        setCounter( newValue );
        addQuantityProduct( productId, newValue, cartAction );
    }
   

    return (
        
        <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 15, fontWeight: '700'}}>{ title }</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                <Button
                    title="-"
                    onPress={ () => increaseBy( -1 ) }
                    titleStyle={{ fontWeight: '800' }}
                    buttonStyle={{
                        backgroundColor: buttonColor,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        height: 40,
                    }}
                    containerStyle={{
                        justifyContent: 'center',
                        width: 45,
                        height: 45,
                        marginVertical: 10,
                    }}
                />
                <TextInput value={ counter.toString() }
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
                    onPress={ () => increaseBy( +1 ) }
                    titleStyle={{ fontWeight: '900' }}
                    buttonStyle={{
                        backgroundColor: buttonColor,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        height: 40,
                    }}
                    containerStyle={{
                        justifyContent: 'center',
                        width: 45,
                        height: 45,
                        marginVertical: 10,
                    }}
                    />
            </View>
        </View>
    )
}
