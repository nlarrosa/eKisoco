import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';



import { styleNews } from '../../theme/newsTheme';
import { ProductContext } from '../../context/ProductContext';
import { NewsCard } from '../../components/products/NewsCard';
import { HorizontalSlide } from '../../components/ui/HorizontalSlide';
import { Loading } from '../../components/ui/Loading';
import { ActivityIndicator } from 'react-native-paper';




export const NewsScreen = () => {

    const { getSearchByText, isLoading } = useContext(ProductContext);
    const [news, setNews] = useState([]);
    const [totalNews, setTotalNews] = useState<number>(0);
    const { width: windowWidth } = Dimensions.get('window');

    useEffect(() => {
      getNews();
    }, []);


    const getNews = async() => {
        const products = await getSearchByText('noveda');
        setTotalNews(products?.CantidadBusqueda);
        setNews(products?.Titulos);
    }


    if(isLoading){
        return (<Loading />);
    }
    

    return (

    <ScrollView >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
            <View style={ styleNews.headerTitle}>
                <Text style={ styleNews.headerTextNews }>DESTACADOS / NOVEDADES</Text>
            </View>
            <Carousel 
                data={ news }
                renderItem={  ({item}) => <NewsCard width={215} height={275} product={ item } ribbonStatus={true}/> }
                sliderWidth={ windowWidth }
                itemWidth={ 200}
                inactiveSlideOpacity={0.6}
                firstItem={2}
                containerCustomStyle={{ flex: 1 }}
                slideStyle={{ flex: 1 }}
            />
        </View>
        <HorizontalSlide 
            products={news}
            title={ 'SEMANA DEL NIÑO' }
        />
        <HorizontalSlide 
            products={news}
            title={ 'SEMANA DEL NIÑO' }
        />
    </ScrollView>
  )
}
