import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';

import { stylesGral } from '../../theme/generalTheme';
import { Picker } from '@react-native-picker/picker';
import colors from '../../constants/color';
import { Divider } from 'react-native-elements';
import { ProductContext } from '../../context/ProductContext';
import { TipoProductosData, FamiliasProductoData, AutorProductData, ProductoData } from '../../interfaces/reposicionesInterface';
import { Loading } from '../ui/Loading';
import { ProductCard } from './ProductCard';



export const AsistenSearch = () => {

  const { getProductTipo, getFamiliaByTipo, isLoading, getAutorByFamilia, getTitulosByAutor, quantityReposity } = useContext(ProductContext)
  const [tipoProducts, setTipoProducts] = useState<TipoProductosData[]>();
  const [familiaProducts, setFamiliaProducts] = useState<FamiliasProductoData[]>();
  const [titulosProductos, setTitulosProductos] = useState<ProductoData[]>();
  const [autorProducts, setAutorProducts] = useState<AutorProductData[]>();
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedFamilia, setSelectedFamilia] = useState('');
  const [selectedAutor, setSelectedAutor] = useState('');
  const [selectedTitulo, setSelectedTitulo] = useState('');
  const [productFilter, setProductFilter] = useState<ProductoData[]>();


  useEffect(() => {
    loadTipoProducts();
  }, []);



  useEffect(() => {

    loadFamiliaProducts();
    setSelectedFamilia('');
    setSelectedAutor('');
    setSelectedTitulo('');

  }, [selectedTipo]);



  useEffect(() => {
    setSelectedAutor('');
    setSelectedTitulo('');
    loadAutorProducts();
  }, [selectedFamilia]);



  useEffect(() => {
    setSelectedTitulo('');
    loadTitulosProducts();
  }, [selectedAutor]);




 /** Obtengo los productos filtrados
   * con la busqueda asistida
   */
  useEffect(() => {
    
    const product = titulosProductos?.filter(
      ( product ) => product.Descripcion.toLowerCase()
      .includes(selectedTitulo.toLowerCase()));

    setProductFilter( product );

  }, [selectedTitulo]);
  

  

  const loadTipoProducts = async() => 
  {
    const tipos:any  = await getProductTipo();
    setTipoProducts(tipos);
  }

  

  const loadFamiliaProducts = async() => 
  {
    const familias:any = await getFamiliaByTipo(selectedTipo);
    setFamiliaProducts(familias);
  }



  const loadAutorProducts = async() => 
  {
    const autor:any = await getAutorByFamilia(selectedFamilia);
    setAutorProducts(autor);
  }



  const loadTitulosProducts = async() => 
  {
    const titulos:any = await getTitulosByAutor(selectedFamilia, selectedAutor);
    setTitulosProductos(titulos);
  }


  (isLoading) && ( <Loading />)

  return (
    <View>
      <View>
        <Picker
          selectedValue={ selectedTipo }
          onValueChange={(itemValue) => setSelectedTipo(itemValue)}
          mode='dialog'
          style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker}}
          >
              <Picker.Item label='Seleccionar Tipo *' value='' />
          { tipoProducts?.map((tipo: TipoProductosData) => (
              <Picker.Item key={ tipo.IdTipoProducto } label={ tipo.Descripcion } value={ tipo.IdTipoProducto } />
          ))}
        </Picker>
      </View>
      <Divider width={1} color={colors.grey} />

      
      { Boolean(selectedTipo) && (
        <View>
          <Picker
            selectedValue={ selectedFamilia}
            onValueChange={(itemValue) => setSelectedFamilia(itemValue)}
            mode='dialog'
            style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker}}
          >
              <Picker.Item label='Seleccionar Familia *' value='' />
          { familiaProducts?.map((familia: FamiliasProductoData) => (
              <Picker.Item key={ familia.IdProductoLogistica } label={ familia.Descripcion } value={ familia.IdProductoLogistica } />
          ))}
          </Picker>
        </View>
      )}
      <Divider width={1} color={colors.grey} />


      { Boolean(selectedFamilia) && (
        <View>
          <Picker
            selectedValue={ selectedAutor}
            onValueChange={(itemValue) => setSelectedAutor(itemValue)}
            mode='dialog'
            style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker}}
          >
              <Picker.Item label='Seleccionar Autor *' value='' />
          { autorProducts?.map((autor: AutorProductData, index: number) => (
              <Picker.Item key={ index } label={ autor.toString() } value={ autor } />
          ))}
          </Picker>
        </View>
      )}
      <Divider width={1} color={colors.grey} />


      { Boolean(selectedAutor) && (
        <View>
          <Picker
            selectedValue={ selectedTitulo }
            onValueChange={(itemValue) => setSelectedTitulo(itemValue)}
          mode='dialog'
          style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker}}
          >
              <Picker.Item label='Seleccionar Titulo *' value='' />
          { titulosProductos?.map((titulos: ProductoData) => (
              <Picker.Item key={ titulos.IdProductoLogistica } label={ titulos.Descripcion } value={ titulos.Descripcion } />
          ))}
          </Picker>
        </View>
      )}
      <Divider width={1} color={colors.grey} />

      { Boolean(selectedTitulo) && (
        <View style={{ marginVertical: 50}}>
          { productFilter?.map( product => (
            <ProductCard 
              key={ product.Edicion}
              quantityRepository={ quantityReposity}   
              producto={ product }
            />
          ))}
        </View>
      )} 
    </View>
  )
}
