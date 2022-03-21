import React, { useContext } from 'react'
import { Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';


import { Quantity } from '../../components/Quantity';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { styleCart } from '../../theme/cartTheme';
import constColor from '../../constants/color';
import { stylesGral } from '../../theme/generalTheme';



export const CartScreen = () => 
{
    const { productsCart, totalPrice, totalQuantity } = useContext(CartContext)
    const { quantityReposity } = useContext(ProductContext);

    
  
    return (
    
    <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        >
        <View style={{ 
            // justifyContent: 'flex-end',
            width: '100%', 
            height: 110,
            borderBottomWidth: 4,
            borderBottomColor: constColor.green,
            backgroundColor: constColor.green,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
        }}>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, flexDirection: 'row'}}>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white'}}>Importe Total:</Text>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white'}}>$ { totalPrice.toFixed(2) }</Text>
                </View>
                <View>
                    <TouchableOpacity style={{ 
                        backgroundColor: 'white',
                        padding: 12,
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                    }}>
                        <Text style={{ 
                            color: constColor.green,
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <ScrollView>
            { productsCart?.map( (product, index) => (
            <View key={ index } style={ styleCart.crContainer}>
                <View style={{ width: '75%'}}>
                    <Text style={ styleCart.crTitleEdicion }>Familia: { product.idProductoLogistica} - Edicion: { product.Edicion }</Text>
                    <Text style={ styleCart.crTitle }>{ product.Descripcion.toUpperCase().split("-")[1] }</Text>
                    <Text style={ styleCart.crSubPrecio }> Precio Unit. { Number(product.Precio).toFixed(2) }</Text>
                    <Text style={ styleCart.crPrecio }>$ { product.PrecioSum.toFixed(2) }</Text>

                    <Quantity 
                        initValue={Number(product.Cantidad)} 
                        max={quantityReposity} 
                        buttonColor={ constColor.green}
                    />

                </View>
                <View style={ styleCart.crButtonDelete }>
                    <Icon 
                        raised
                        reverse
                        type='ionicon' 
                        name='trash' 
                        color={constColor.danger} 
                        size={20}
                    />
                </View>
            </View>
            ))}
        </ScrollView>

    </KeyboardAvoidingView>
  )
}
