import { useState } from 'react';


export const useForm = <T extends Object>( initState: T ) => {
    
    const [state, setState] = useState( initState );



    const onChange = ( value: string, field: keyof T ) => {
        setState({
            ...state,
            [field]: value
        });
    }



    const setFormValue = ( form: T ) =>{
        setState( form );
    }



    const resetField = (value: string, field: keyof T) => {

        setState({
            ...state,
            [field]: value,
        });
    }


    
    return {
        ...state,
        formData: state,
        onChange,
        setFormValue,
        resetField,
    }

}