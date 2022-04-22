import React, { useContext, useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { CartContext } from '../../context/CartContext';
import { stylesGral } from '../../theme/generalTheme';




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
            <Text style={ stylesGral.qtQuantityTitle }>{ title }</Text>
            <View style={ stylesGral.qtQuantityContainer }>
                <Button
                    title="-"
                    onPress={ () => increaseBy( -1 ) }
                    titleStyle={{ fontWeight: '800' }}
                    buttonStyle={{...stylesGral.qtQuantityBtnLeft, backgroundColor: buttonColor }}
                    containerStyle={ stylesGral.qtQuantityBtnText }
                />
                <TextInput value={ counter.toString() }
                    textAlign='center'
                    keyboardType='numeric'
                    autoCapitalize='none'
                    autoCompleteType='off'
                    editable={ true }
                    style={ stylesGral.qtQuantityText }
                    />
                <Button
                    title="+"
                    onPress={ () => increaseBy( +1 ) }
                    titleStyle={{ fontWeight: '900' }}
                    buttonStyle={{ ...stylesGral.qtQuantityBtnRight, backgroundColor: buttonColor }}
                    containerStyle={ stylesGral.qtQuantityBtnText }
                    />
            </View>
        </View>
    )
}
