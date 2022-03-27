import React, {useState} from 'react'
import { Switch } from 'react-native';

import  constColor  from '../constants/color';


interface Props {
    isOn: boolean,
    onChange: (value: boolean) => void,
}

export const CustomSwitch = ({ isOn, onChange }: Props ) => {

    const colorGreenLight = constColor.greenLight;
    const colorGreen = constColor.green;
    const [isEnabled, setIsEnabled] = useState(isOn);

    const toggleSwitch = () => { 

        setIsEnabled(!isEnabled);
        onChange(!isEnabled);
    };

  return (
    
    <Switch
        trackColor={{ false: '#767577', true:  colorGreen }}
        thumbColor={isEnabled ? colorGreen : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
    />
  )
}
