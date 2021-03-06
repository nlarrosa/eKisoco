import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';


import { stylesGral } from '../../theme/generalTheme';
import { styleProduct } from '../../theme/productTheme';
import  constColor  from '../../constants/color';
import { AsistenSearch } from '../../components/products/AsistenSearch';
import { ProductContext } from '../../context/ProductContext';
import { useNavigation } from '@react-navigation/native';
import { ProductSearchData, ProductoData } from '../../interfaces/reposicionesInterface';
import { ProductCard } from '../../components/products/ProductCard';
import { CartContext } from '../../context/CartContext';
import { Loading } from '../../components/ui/Loading';
import { AuthContext } from '../../context/AuthContext';
import { DisabledReposity } from './DisabledReposity';






export const ProductScreen = () => {

    const { enabledReposity } = useContext(AuthContext);
    const { messageProduct, titleMessage:title ,removeError, getSearchByText, quantityReposity, isLoading, getUserQuantityReposity } = useContext(ProductContext);
    const { messageCart, removeMessageCart, titleMessage} = useContext(CartContext);
    const [search, setSearch] = useState<string>('');
    const [searchText, setSearchText] = useState<boolean>(true);
    const [titleAsistida, setTitleAsistida] = useState<string>('BUSQUEDA ASISTIDA');
    const [searchResult, setSearchResult] = useState<ProductSearchData>();


    /** Validamos si el usuario esta habilitado
     * para hacer reposiciones
     */
    useEffect(() => {
        if(enabledReposity){
            getUserQuantityReposity();
        }
    }, [messageProduct])



    /** Validamos si existe alguna alerta que
     * venga del context
     */
    useEffect(() => {

        if(messageProduct?.length === 0)
        return;

        Alert.alert(
            title,
            messageProduct,
            [ { text: "Salir", onPress: removeError} ],
        );

    }, [messageProduct])



    /** Alertas generadas desde el contexto 
     * del carrito cuando agregamos productos
     */
    useEffect(() => {
      
        if(messageCart?.length === 0)
        return;

        Alert.alert(
            titleMessage,
            messageCart,
            [{ text: 'Aceptar', style: "destructive", onPress: removeMessageCart}]
        );
        
    }, [messageCart])



    /** Busqueda de productos por texto */
    const serachTextHandler = async() => 
    {
        setSearchResult(undefined);
        const result = await getSearchByText(search.toLowerCase());
        setSearchResult(result);
        Keyboard.dismiss();
    }



    /** Realizamos la busqueda asistida ocultando
     * la busqueda por texto y utilizando el  componente AsistenSearch
     */
    const searchAsistidaHandler = async () => 
    {
        setSearchText(!searchText);
        
        (searchText) 
        ? setTitleAsistida('BUSCAR POR TEXTO') 
        : setTitleAsistida('BUSQUEDA ASISTIDA');
    };




    /** Limpia los resultados de busqueda */
    const removeSearch = () => 
    {
        setSearchResult(undefined);
    }



    
    if(!enabledReposity){
        return <DisabledReposity />
    }

    return (

    <KeyboardAvoidingView
        style={ stylesGral.glSafeArea }
        behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        keyboardVerticalOffset={ 50 }
    >
        <ScrollView   nestedScrollEnabled={true} keyboardShouldPersistTaps='handled'>
            <View style={ styleProduct.container }>
                { searchText && (
                    <View>
                        <Text style={ styleProduct.title }>Seleccione Modo de B??squeda</Text>
                        <SearchBar 
                            platform="default"
                            placeholder="Titulo o producto a buscar..."
                            lightTheme={ true }
                            onChangeText={ (text) => setSearch(text) }
                            onClear={ removeSearch }
                            onSubmitEditing={ serachTextHandler }
                            value={search}
                            containerStyle={{
                                backgroundColor: constColor.green,
                                borderRadius: 40
                            }}
                            inputContainerStyle={{
                                backgroundColor: 'white',
                                borderRadius: 40,
                            }}
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
                        <TouchableOpacity 
                        style={styleProduct.glButton }
                        onPress={ serachTextHandler }
                        >
                            <Text style={ stylesGral.glButtonText }>Buscar</Text>
                        </TouchableOpacity>
                    }
                </View>

                { searchText && searchResult?.Titulos.length !== 0 && (
                    <View>
                        { searchResult?.Titulos.map( product => (
                            <ProductCard 
                                key={ product.Edicion }
                                quantityRepository={ quantityReposity}
                                producto={ product }
                            />
                            ))}
                    </View>
                )}
                
                { !searchText && (
                    <View>    
                        <AsistenSearch />
                    </View>
                )}

            </View>
            
            { isLoading && (
                <Loading />
            )}
        </ScrollView>
    </KeyboardAvoidingView>
    )
}


