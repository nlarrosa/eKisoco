import React, { useEffect, useState } from 'react';


export interface Props {
    field: string,
    type: string,
    value: string,
}


export interface ValidateProps extends Array<Props>{};



export const useFormValidate = () => {

    const [error, setError] =  useState<string>('');
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;



    const validateHandler = <T extends ValidateProps>(fields: T) => {

        fields.map((val) => {

            switch (val.type) {

                case 'required':
                    
                    if(val.value.length === 0){  
                        setError('Complete el campo ' + val.field);
                        return;
                    }
                break;

                case 'required|email':

                    if(val.value.length === 0){  
                        setError('Complete el campo ' + val.field);
                        return;
                    }

                    if(!emailRegex.test(val.value)){  
                        setError('El campo ' + val.field + ' es incorrecto.');
                        return;
                    }
                break;  
                    
            
                default:
                     '';
                break;
            }
        });
    }

    return {
        error,
        validateHandler,
    }
}
