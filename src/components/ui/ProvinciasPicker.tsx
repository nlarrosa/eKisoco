import React  from 'react'
import { Picker } from '@react-native-picker/picker'
import { stylesGral } from '../../theme/generalTheme';



interface Props {

    provSelected: React.SetStateAction<string> | undefined,
    onChange: (value: React.SetStateAction<string>) => void,
}


export const ProvinciasPicker = ({ provSelected, onChange }: Props) => {

    
    const provincias: Object[] = [
    
        { value: 'Buenos Aires', label: 'Buenos Aires' },
        { value: 'Capital Federal', label: 'Capital Federal' },
        { value: 'Catamarca', label: 'Catamarca' },
        { value: 'Chaco', label: 'Chaco' },
        { value: 'Chubut', label: 'Chubut' },
        { value: 'Cordoba', label: 'Córdoba' },
        { value: 'Corrientes', label: 'Corrientes' },
        { value: 'Entre Rios', label: 'Entre Ríos' },
        { value: 'Formosa', label: 'Formosa' },
        { value: 'Jujuy', label: 'Jujuy' },
        { value: 'La Pampa', label: 'La Pampa' },
        { value: 'La Rioja', label: 'La Rioja' },
        { value: 'Mendoza', label: 'Mendoza' },
        { value: 'Misiones', label: 'Misiones' },
        { value: 'Neuquen', label: 'Neuquén' },
        { value: 'Rio Negro', label: 'Río Negro' },
        { value: 'Salta', label: 'Salta' },
        { value: 'San Juan', label: 'San Juan' },
        { value: 'San Luis', label: 'San Luis' },
        { value: 'Santa Cruz', label: 'Santa Cruz' },
        { value: 'Santa Fe', label: 'Santa Fe' },
        { value: 'Santiago del Estero', label: 'Santiago del Estero' },
        { value: 'Tierra del Fuego', label: 'Tierra del Fuego' },
        { value: 'Tucuman', label: 'Tucumán' },
    ];
    
    

  
    return (
    <>
        <Picker
            selectedValue={ provSelected }
            onValueChange={ onChange }
            mode='dialog'
            style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker }}    
        >
            <Picker.Item label='Seleccione una provincia *' value='' />
            {   provincias.map((item: any, index: any) => (
                    <Picker.Item label={ item.label } value={ item.value } key={item.label} />
                ))
            }
        </Picker>
    </>
  )
}