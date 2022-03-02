import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {
    
    const [formData, setFormData] = useState( initState );



    const onChange = ( value: string, field: keyof T ) => {

        setFormData({
            ...formData,
            [field]: value
        });
    }


    const resetForm = () => {
        setFormData({ ...initState });
    }

    return {
        ...formData,
        formData,
        onChange,
        resetForm,
    }

}