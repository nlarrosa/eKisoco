import React, { useContext, useEffect } from 'react'
import { Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';



import { Quantity } from '../../components/Quantity';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import { styleCart } from '../../theme/cartTheme';
import constColor from '../../constants/color';
import { LogoEmptyCart } from '../../components/LogoEmptyCart';
import { CartData } from '../../interfaces/cartInterfaces';
import { useNavigation } from '@react-navigation/native';





export const CartScreen = () => 
{
    const { productsCart, totalPrice, removeToCart, totalQuantity, 
            generateOrder, messageCart, titleMessage 
    } = useContext(CartContext)

    const navigation = useNavigation();
    const { quantityReposity } = useContext(ProductContext);


    
    const confirmRemoveProduct = (productId: string) => {

        Alert.alert(
          "Atencion!",
          "Desea borrar el producto seleccionado?",
          [ { text: "SI", onPress: () => { removeToCart(productId) }},
            { text: "NO"},
          ]
        );
    };


    const confirmGenerateOrder = (products: {[key: string] : CartData} ) => {

        Alert.alert(
          "Atencion!",
          "Desea confirmar el pedido?",
          [ { text: "SI", onPress: () => { generateOrder(products) }},
            { text: "NO"},
          ]
        );
    };


    if( totalQuantity <= 0){ 
        return ( 
            <LogoEmptyCart 
                subTitle='El carrito se encuentra vacio.' 
            />
        );
    }
  
    return (
    
    <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        >
        <View style={{ 
            // justifyContent: 'flex-end',
            width: '100%', 
            height: 120,
            paddingTop: 15,
            paddingBottom: 15,
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
                    <Text style={{ fontSize: 15, color: 'white', marginBottom: 5}}>Total Artículos: { totalQuantity }</Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white'}}>Total PVP:</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>$ { totalPrice.toFixed(2) }</Text>
                </View>

                { totalQuantity > 0 && 
                    <View>
                        <TouchableOpacity 
                        onPress={ () => confirmGenerateOrder(productsCart || []) }
                        style={{ 
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
                }
            </View>
        </View>
        <ScrollView>
            { Object.entries(productsCart).map( ([ key, product] ) => (
            <View key={ product.Edicion } style={ styleCart.crContainer}>
                <View style={{ width: '75%'}}>
                    <Text style={ styleCart.crTitleEdicion }>Familia: { product.idProductoLogistica} - Edicion: { product.Edicion }</Text>
                    <Text style={ styleCart.crTitle }>{ product.Descripcion.toUpperCase().split("-")[1] }</Text>
                    <Text style={ styleCart.crSubPrecio }> Precio Unit. { Number(product.Precio).toFixed(2) }</Text>
                    <Text style={ styleCart.crPrecio }>$ { product.PrecioSum.toFixed(2) }</Text>

                    <Quantity 
                        initValue={ Number( product.Cantidad ) }
                        max={ quantityReposity } 
                        buttonColor={ constColor.green }
                        title={ 'Cantidad Seleccionada' }
                        productId={String(product?.Edicion)}
                        cartAction={true}
                    />

                </View>
                <View style={ styleCart.crButtonDelete }>
                    <TouchableOpacity onPress={ () => confirmRemoveProduct(product.Edicion)}>
                        <Icon 
                            raised
                            reverse
                            type='ionicon' 
                            name='trash' 
                            color={constColor.danger} 
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            ))}
        </ScrollView>

    </KeyboardAvoidingView>
  )
}
