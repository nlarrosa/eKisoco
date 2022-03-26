import { useEffect, useState, useContext } from "react"
import { ProductContext } from '../context/ProductContext';

interface Props {
    max?: number,
    initValue?: number,
}


export const useQuantity = ( { max = 500, initValue = 1 }: Props ) => {

    const { getQuantityProduct} = useContext(ProductContext);
    const [ counter, setCounter ] = useState<number>(0);

    useEffect(() => {
        setCounter(initValue);
    },[]);


    const increaseBy = ( value: number ) => {

        const newValue =  Math.min(max, Math.max( counter + value, 1 ))
        setCounter( newValue );
        getQuantityProduct( newValue );
    }


    return {
        counter,
        increaseBy,
    }

}