import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProductoData } from '../../interfaces/reposicionesInterface';
import constColor from '../../constants/color';
import { useNavigation } from '@react-navigation/core';




interface Props {
    width?: number,
    height?: number,
    product: ProductoData,
    ribbonStatus?: boolean
}


export const NewsCard = ({ width=180, height=220, product, ribbonStatus=false }: Props) => {

    const navigation: any = useNavigation();
    const urlImg = product.URLImagen;

  return (
    <TouchableOpacity
        onPress={ () => navigation.navigate('ProductDetailScreen', product ) }
        activeOpacity={0.6}
        style={ {
            width,
            height,
            marginHorizontal: 2,
            paddingBottom: 0,
            paddingHorizontal: 7
        }}
    >
        <View style={ styles.imageContainer }>
            {ribbonStatus && (
                <View style={{ 
                    position: 'absolute',
                    top: height -45,
                    left: width / 2 - 85
                }}>
                    <View style={{ 
                        backgroundColor: constColor.green, 
                        zIndex: 9000, 
                        padding: 5, 
                        borderRadius: 10,
                        width: 160,
                        shadowColor: "#000",
                        borderColor: 'white',
                        borderWidth: 2,
                        shadowOffset: {
                            width: 2,
                            height: 10,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 7,
                        elevation: 15,
                    }}>
                        <Text style={{ 
                            fontSize: 15, 
                            fontWeight: 'bold', 
                            textAlign: 'center', 
                            color: 'white',}}>PROMO $990</Text>
                    </View>
                </View>
            )}
            <Image
                source={{ uri: urlImg }}
                style={ styles.image }
            />
        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 5,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 9,
    },

    iconView: {
        position: 'absolute',
        top: '90%',
        left: '35%'
    }
});