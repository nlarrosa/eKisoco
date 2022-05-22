import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ProductoData } from '../../interfaces/reposicionesInterface';
import { useNavigation } from '@react-navigation/core';
import { styleProduct } from '../../theme/productTheme';


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
        style={{ ...styleProduct.ncCountainer, width,height }}
    >
        <View style={ styleProduct.ncImageContainer }>
            {ribbonStatus && (
                <View style={{ 
                    position: 'absolute',
                    top: height -45,
                    left: width / 2 - 85
                }}>
                    { !product.Circulado && (
                        <View style={ styleProduct.ncRibbon }>
                                <Text style={ styleProduct.ncRibbonText }>PROXIMAMENTE!</Text>
                        </View>
                    )}
                </View>
            )}
            <Image
                source={{ uri: urlImg }}
                style={ styleProduct.ncImage }
            />
        </View>
    </TouchableOpacity>
  )
}
