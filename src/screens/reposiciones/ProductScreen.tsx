import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';


import { stylesGral } from '../../theme/generalTheme';
import { styleProduct } from '../../theme/productTheme';
import  constColor  from '../../constants/color';
import { AsistenSearch } from '../../components/AsistenSearch';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { rootDrawParams } from '../../navigator/DrawerNavigator';
import Sgdi from '../../api/Sgdi';



export const ProductScreen = () => {

    const [search, setSearch] = useState('');
    
    


  return (

    <SafeAreaView style={ stylesGral.glSafeArea }>
        <View style={ styleProduct.container }>
            <Text style={ styleProduct.title }>Seleccione Modo de Búsqueda</Text>
            <SearchBar 
                
                placeholder="Titulo o producto a buscar..."
                lightTheme={ true }
                onChangeText={ (text) => setSearch(text) }
                value={search}
                containerStyle={{
                    backgroundColor: constColor.green,
                    borderRadius: 40
                }}
                inputContainerStyle={{
                    backgroundColor: 'white',
                    borderRadius: 40,
                }}
                onClear={ () => {}}
            />
        </View>
        <View style={ styleProduct.container }>
            { !search ? 
                <TouchableOpacity style={ styleProduct.buttonChangeSearch }>
                    <Text style={ styleProduct.textChangeSearch }>BUSQUEDA ASISTIDA</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity style={ stylesGral.glButton }>
                    <Text style={ stylesGral.glButtonText }>Buscar</Text>
                </TouchableOpacity>
            }
        </View>
    </SafeAreaView>
  )
}


