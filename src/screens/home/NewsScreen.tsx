import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';



import { styleNews } from '../../theme/newsTheme';
import { ProductContext } from '../../context/ProductContext';
import { NewsCard } from '../../components/products/NewsCard';
import { HorizontalSlide } from '../../components/ui/HorizontalSlide';
import { Loading } from '../../components/ui/Loading';
import { NewsData, ProductoData } from '../../interfaces/reposicionesInterface';
import { SafeAreaView } from 'react-native-safe-area-context';






export const NewsScreen = () => {

    const { getNews, getUserQuantityReposity } = useContext(ProductContext);
    const [news, setNews] = useState<NewsData[]>([]);
    const [destacados, setDestacados] = useState<ProductoData[]>([]);
    const [titleHome, setTitleHome] = useState<string>('');
    const { width: windowWidth } = Dimensions.get('window');
    const { height: windowHeight } = Dimensions.get('window');
    const [firsInit, setFirsInit] = useState<number>(3);
    const [isLoading, setIsLoading] = useState<boolean>(true);



    useEffect(() => {
      getInit();
      getUserQuantityReposity();
    }, []);


    const getInit = async() => {

        const products = await getNews();
        const destacadosData: NewsData[] = products?.filter( ({ Orden }) => Orden === 1);
        const newsData: NewsData[] = products?.filter( ({ Orden }) => Orden >= 2 );
        const initItem: any = destacadosData[0].items.findIndex( (item) => item.Circulado === false);


        setTitleHome(destacadosData[0].Nombre.toUpperCase());
        setDestacados(destacadosData[0].items);
        setNews(newsData);
        setFirsInit(initItem);
        setIsLoading(false);
    }


    if(isLoading){
        return (<Loading />);
    }
    

    return (
        
        <ScrollView style={{ flex: 1, backgroundColor: 'white'}} >
            <View style={ (news.length > 1) ? styleNews.caContainer: styleNews.caContainerOne}>
                <View style={ styleNews.headerTitle}>
                    <Text style={ styleNews.headerTextNews }>{titleHome}</Text>
                </View>
                <Carousel 
                    layout={'default'} 
                    layoutCardOffset={18}
                    data={destacados}
                    firstItem={firsInit}
                    renderItem={  ({item}) => 
                        <NewsCard 
                            width={(news.length > 1) ? 200 : 240} 
                            height={(news.length > 1) ? 250 : 330} 
                            product={ item } 
                            ribbonStatus={true}
                        /> }
                    sliderWidth={ windowWidth }
                    itemWidth={(news.length > 1) ? 210 : 250}
                    inactiveSlideOpacity={0.7}
                />
            </View>

            <View style={ (news.length > 1) ? styleNews.hsContainer : styleNews.hsContainerOne }>
                { news.map( ({ items, Nombre }, index) => (
                <View key={index} style={{ justifyContent: 'center' }}>
                    <HorizontalSlide 
                        products={items}
                        title={ Nombre.toUpperCase() }
                    />
                </View>
                ))}
            </View>
        </ScrollView>
  )
}
