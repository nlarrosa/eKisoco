import { useEffect, useState, useContext } from "react"
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

interface Props {
    max?: number,
    initValue?: number,
    productId: string,
}


export const useQuantity = ( { max = 500, initValue = 1, productId }: Props ) => {

    const { getQuantityProduct} = useContext(ProductContext);
    const { addQuantityProduct } = useContext(CartContext);
    const [ counter, setCounter ] = useState<number>(0);

    useEffect(() => {
        setCounter(initValue);
    },[]);


    const increaseBy = ( value: number ) => {

        const newValue =  Math.min(max, Math.max( counter + value, 1 ))
        setCounter( newValue );
        addQuantityProduct( productId, newValue );
    }


    return {
        counter,
        increaseBy,
    }

}