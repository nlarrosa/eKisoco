import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { Icon, Input } from 'react-native-elements';





import { stylesGral } from '../../theme/generalTheme';
import  constColor  from '../../constants/color';
import { styleRegister } from '../../theme/registerTheme';
import { CustomSwitch } from '../../components/CustomSwitch';
import { LogoHeader } from '../../components/LogoHeader';
import { UserContext } from '../../context/UserContext';
import { CuentasMadresData } from '../../interfaces/userInterfaces';
import { useForm } from '../../hooks/useForm';



interface Props extends StackScreenProps<any, any>{}



export const RegisterScreen = ( {navigation}: Props ) => {

  const colorGreen        = constColor.green;
  const colorGreenLight   = constColor.greenLight;
  const goToLogin         = () => navigation.navigate('LoginScreen');

  const { getCuentasMadres, cuentasMadresData } = useContext(UserContext);
  const [basesStatus, setBasesStatus] = useState({ isActive: false });
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCuenta, setSelectedCuenta] = useState('');
  const [regionStatus, setRegionStatus] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { isActive } = basesStatus;


  const zona = [
    { label: "AMBA",  value: "YDC" },
    { label: "Interior",  value: "YDI" }
  ];


  const { onChange, formData } = useForm({
    email: '',
    clave: '',
    reclave: '',
    nombre: '',
    apellido: '',
    direccion: '',
    codpostal: '',
    celular: '',
    region: selectedRegion,
    distribuidor: selectedCuenta,
    localidad: '',
    paquete: '',
  })



  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);



  /** Obtiene el valor del switch 
   * de terminos y condiciones
   */
  const handlerChangeBases = (value: boolean, field: string) => {
    setBasesStatus({
      ...basesStatus,
      [field] : value,
    });
  };
  

/**Obtenemos las cuentas madres cuando
 * seleccionamos la region
 */
  useEffect(() => {

    (selectedRegion == 'YDC') 
      ? setRegionStatus(true) 
      : setRegionStatus(false);
    
    setSelectedCuenta('');
    getCuentasMadres(selectedRegion);
  }, [selectedRegion])


  /** actualiza el valor de los campos
   * input del formulario
   */
  const saveRegisterHandler = () => {
    console.log(formData);
  }
  
    
  return (
      <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
      >
        {/* Logo */}
        <LogoHeader subTitle={ 'Registrate ahora!' }/>

        {/* Form Register */}
        <ScrollView style={ stylesGral.glScrollView }>
          <View style={ styleRegister.registerContainer }>
            <Input 
              inputStyle={{ fontSize: 16}}
              placeholder='Email *'
              keyboardType='email-address'
              value={ formData.email }
              onChangeText={ (value) => onChange( value, 'email' )}
            />
            <Input 
              inputStyle={{ fontSize: 16}}
              placeholder='Clave *'
              keyboardType='default'
              secureTextEntry={ (showPass) ? false : true }
              value={ formData.clave }
              onChangeText={ (value) => onChange( value, 'clave' )}
              rightIcon={
                <Icon 
                    type='ionicon'
                    name={(showPass) ? 'eye-off-outline' : 'eye-outline'}
                    iconStyle={{
                      marginRight: 10,
                    }}
                    onPress={ () => setShowPass(!showPass)}
                />
              }
            />
            <Input
              inputStyle={{ fontSize: 16}}
              placeholder='Reingresar Clave *'
              keyboardType='default'
              secureTextEntry={ (showPass) ? false : true }
              value={ formData.reclave }
              onChangeText={ (value) => onChange(value, 'reclave' )}
            />
            <Input
              inputStyle={{ fontSize: 16}}
              placeholder='Nombre *'
              keyboardType='default'
              value={ formData.nombre }
              onChangeText={ (value) => onChange(value, 'nombre' )}
            />
            <Input
              placeholder='Apellido *'
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.apellido }
              onChangeText={ (value) => onChange(value, 'apellido' )}
            />
            <Input
              placeholder='Direccion *'
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.direccion }
              onChangeText={ (value) => onChange(value, 'direccion' )}
            />
            <Input
              placeholder='Cod. Postal *'
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.codpostal }
              onChangeText={ (value) => onChange(value, 'codpostal' )}
            />
            <Input
              placeholder='Celular *'
              keyboardType='numeric'
              inputStyle={{ fontSize: 16}}
              value={ formData.celular }
              onChangeText={ (value) => onChange(value, 'celular' )}
            />

            <Picker
              selectedValue={selectedRegion}
              onValueChange={(itemValue) => setSelectedRegion(itemValue)}
              mode='dropdown'
              style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker}}
            >
                <Picker.Item label='Seleccionar Amba o Interior *' value='' />
              { zona.map((zona, index) => (
                <Picker.Item key={ index } label={ zona.label } value={ zona.value } />
              ))}
            </Picker>
        
            { selectedRegion.length > 0 && 
              <Picker
              selectedValue={selectedCuenta}
              onValueChange={(itemValue, itemIndex) => setSelectedCuenta(itemValue)}
              mode='dialog'
              style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker}}
              >
                  <Picker.Item label='Distribuidora *' value='' />
                { cuentasMadresData?.map( (cuenta:CuentasMadresData, index: any) => (
                  <Picker.Item key={ index} label={ cuenta.RazonSocial.toUpperCase()} value={ cuenta.IdCuentaMadre } />
                  ))}
              </Picker>
            }

            {regionStatus && 
              <Input
                placeholder='Localidad  (opcional)'
                keyboardType='default'
                inputStyle={{ fontSize: 16}}
                value={ formData.localidad }
                onChangeText={ (value) => onChange( value, 'localidad' )}
              />
            }

            <Input
              placeholder={ (regionStatus) ? 'Paquete *' : 'Paquete (Opcional)'} 
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.paquete }
              onChangeText={ (value) => onChange( value, 'paquete' )}
            />
          </View>    


          {/* Check Terminos */}
          <View style={ styleRegister.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>Acepta términos y condiciones *</Text>
            </TouchableOpacity>
            <CustomSwitch isOn={ isActive } onChange={ ( value ) => handlerChangeBases(value, 'isActive')} />
          </View>


          {/* Buttons */}
          <View style={ stylesGral.glFooterContainer }>
              <TouchableOpacity 
                style={ stylesGral.glButton }
                onPress={ saveRegisterHandler }
              >
                <Text style={ stylesGral.glButtonText }>Registrate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ goToLogin }>
                <Text style={ stylesGral.glTextLink }>Ingresar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ goToLogin }>
                <Text style={ stylesGral.glTextLink }>Olvidaste tu clave?</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
   

  )
}


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%'
  },
});


