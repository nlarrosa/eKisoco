import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Image, ScrollView, FlatList } from 'react-native';
import { Button, Card, Icon, SearchBar } from 'react-native-elements';


import { stylesGral } from '../../theme/generalTheme';
import { styleProduct } from '../../theme/productTheme';
import  constColor  from '../../constants/color';
import { AsistenSearch } from '../../components/AsistenSearch';
import { ProductContext } from '../../context/ProductContext';
import { ProductCard } from '../../components/ProductCard';



export const ProductScreen = () => {

    
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState(true);
    const [titleAsistida, setTitleAsistida] = useState('BUSQUEDA ASISTIDA')
    
    const BASE_URI = 'https://q-sgdiwebapi.lanacion.com.ar/Imagenes/110930/16.jpg';

    const serachTextHandler = () => {


    }


    /** Realizamos la busqueda asistida ocultando
     * la busqueda por texto y utilizando el 
     * componente AsistenSearch
     */
    const searchAsistidaHandler = async () => {
        
        setSearchText(!searchText);
        
        (searchText) 
        ? setTitleAsistida('BUSCAR POR TEXTO') 
        : setTitleAsistida('BUSQUEDA ASISTIDA');
    }




  return (

    <KeyboardAvoidingView
        style={ stylesGral.glSafeArea }
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
    >
        <ScrollView>
        <View style={ styleProduct.container }>
            { searchText && (
                <View>
                    <Text style={ styleProduct.title }>Seleccione Modo de Búsqueda</Text>
                    <SearchBar 
                        platform="default"
                        placeholder="Titulo o producto a buscar..."
                        lightTheme={ true }
                        onChangeText={ (text:string) => setSearch(text) }
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
            )}

            <View>
                { !search ? 
                    <TouchableOpacity 
                        style={ styleProduct.buttonChangeSearch }
                        onPress={ searchAsistidaHandler }
                    >
                        <Text style={ styleProduct.textChangeSearch }>{ titleAsistida }</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={styleProduct.glButton }>
                        <Text style={ stylesGral.glButtonText }>Buscar</Text>
                    </TouchableOpacity>
                }
            </View>
            
            <View>    
                { !searchText && (
                    <AsistenSearch />
                )}
            </View>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}


