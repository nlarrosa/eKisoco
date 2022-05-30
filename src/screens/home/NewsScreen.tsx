import React, { useContext, useEffect, useState } from 'react'
import { View, Text,Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';



import { styleNews } from '../../theme/newsTheme';
import { ProductContext } from '../../context/ProductContext';
import { NewsCard } from '../../components/products/NewsCard';
import { HorizontalSlide } from '../../components/ui/HorizontalSlide';
import { Loading } from '../../components/ui/Loading';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import constColor from '../../constants/color';
import { NewsData, ProductoData } from '../../interfaces/reposicionesInterface';





export const NewsScreen = () => {

    const { getNews, isLoading, getUserQuantityReposity } = useContext(ProductContext);
    const [news, setNews] = useState<ProductoData[]>([]);
    const [titleNews, setTitleNews] = useState<string>('')
    const [destacados, setDestacados] = useState<ProductoData[]>([]);
    const [titleHome, setTitleHome] = useState<string>('');
    const { width: windowWidth } = Dimensions.get('window');
    const [firsInit, setFirsInit] = useState<number>(3);
    // const [modalProductDetail, setModalProductDetail] = useState(false)
    // const [productDetail, setProductDetail] = useState<ProductoData>();



    useEffect(() => {
      getInit();
      getUserQuantityReposity();
    }, []);


    const getInit = async() => {

        const products = await getNews();
        const destacadosData: NewsData[] = products?.filter( ({ Orden }) => Orden === 1);
        const newsData: NewsData[] = products?.filter( ({ Orden }) => Orden === 2 );
        const initItem: any = destacadosData[0].items.findIndex( (item) => item.Circulado === false);


        setTitleHome(destacadosData[0].Nombre.toUpperCase());
        setDestacados(destacadosData[0].items);
        setTitleNews(newsData[0].Nombre.toUpperCase());
        setNews(newsData[0].items);
        setFirsInit(initItem);
    }


    if(isLoading){
        return (<Loading />);
    }
    

    return (
    
    <View style={{ backgroundColor: 'white', flexDirection: 'column', flex: 1 }}>
        <View style={{ flex:3, justifyContent: 'center', alignItems: 'center' }}>
            <View style={ styleNews.headerTitle}>
                <Text style={ styleNews.headerTextNews }>{titleHome}</Text>
            </View>
            <Carousel 
                data={destacados}
                firstItem={firsInit}
                renderItem={  ({item}) => 
                    <NewsCard 
                        width={230} 
                        height={295} 
                        product={ item } 
                        ribbonStatus={true}
                    /> }
                sliderWidth={ windowWidth }
                itemWidth={220}
                inactiveSlideOpacity={0.5}
                containerCustomStyle={{ flex: 1 }}
                slideStyle={{ flex: 1 }}
            />
        </View>
        <Divider width={4} color={ constColor.green } style={{ marginVertical: 5 }}/>
        <View style={{ flex:2}}>
            <HorizontalSlide 
                products={news}
                title={ titleNews }
            />
        </View>
    </View>

  )
}
