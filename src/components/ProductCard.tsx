import React from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';


import { ProductoData } from '../interfaces/reposicionesInterface';
import { styleProduct } from '../theme/productTheme';
import { stylesGral } from '../theme/generalTheme';


export const ProductCard = ( products: ProductoData ) => {

    
  return (
    
    <FlatList 
        data={products}
        keyExtractor={ (product) => products.IdProductoLogistica}
        renderItem={ ( { item, index } ) => (
            <Card>
            <Card.Title>HELLO WORLD</Card.Title>
            <Card.Divider />
            <Card.Image style={{ padding: 0, height:250 }}
              source={{
                uri: BASE_URI,
              }}
            />
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <TouchableOpacity style={styleProduct.glButton }>
                <Text style={ stylesGral.glButtonText }>Buscar</Text>
            </TouchableOpacity>
          </Card>
        )}
    />
  )
}
