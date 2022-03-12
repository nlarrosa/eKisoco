import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { Icon, Input } from 'react-native-elements';


import { stylesGral } from '../../theme/generalTheme';
import  constColor  from '../../constants/color';
import { styleRegister } from '../../theme/registerTheme';
import { CustomSwitch } from '../../components/CustomSwitch';
import { LogoHeader } from '../../components/LogoHeader';
import { UserContext } from '../../context/UserContext';
import { CuentasMadresData, CuentasHijasData } from '../../interfaces/userInterfaces';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/AuthContext';



interface Props extends StackScreenProps<any, any>{}



export const RegisterScreen = ( {navigation}: Props ) => {

  const colorGreen        = constColor.green;
  const colorGreenLight   = constColor.greenLight;
  const goToLogin         = () => navigation.navigate('LoginScreen');

  const { getCuentasMadres, getCuentasHijas, cuentasMadresData, cuentasHijasData } = useContext(UserContext);
  const { signUp, errorSignup, removeError } = useContext(AuthContext);

  const [basesStatus, setBasesStatus] = useState({ isActive: false });
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCuenta, setSelectedCuenta] = useState('');
  const [selectedCuentaHija, setSelectedCuentaHija] = useState({});
  const [regionStatus, setRegionStatus] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { isActive } = basesStatus;


  const zona = [
    { label: "AMBA",  value: "YDC" },
    { label: "Interior",  value: "YDI" }
  ];


  const { onChange, formData } = useForm({
    Email: '',
    Clave: '',
    ReClave: '',
    Nombre: '',
    Apellido: '',
    Direccion: '',
    CodPostal: '',
    Celular: '',
    Localidad: '',
    Paquete: '',
  })



  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);


  /** Evaluamos los campos a validar y 
   * devolvemos el error
   */
  useEffect(() => {
    
    if(errorSignup.length === 0) 
    return;

    Alert.alert(
      'Error de Registro', 
      errorSignup, 
      [{ text: 'Aceptar', onPress: removeError}]
    );
  }, [errorSignup]);



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
    setSelectedCuentaHija('');
    getCuentasMadres(selectedRegion);
  }, [selectedRegion])



  /** Obtenemos las cuentas hijas segun
   *  ID cuenta madre seleccionado
   */
  useEffect(() => {
    getCuentasHijas(selectedCuenta);
  }, [selectedCuenta])
  


  /** actualiza el valor de los campos
   * input del formulario
   */
  const saveRegisterHandler = () => {
    signUp(formData, selectedRegion, selectedCuenta, selectedCuentaHija, basesStatus.isActive);
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
              value={ formData.Email }
              onChangeText={ (value) => onChange( value, 'Email' )}
            />
            <Input 
              inputStyle={{ fontSize: 16}}
              placeholder='Clave *'
              keyboardType='default'
              secureTextEntry={ (showPass) ? false : true }
              value={ formData.Clave }
              onChangeText={ (value) => onChange( value, 'Clave' )}
              rightIcon={
                <Icon 
                    tvParallaxProperties={undefined}
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
              value={ formData.ReClave }
              onChangeText={ (value) => onChange(value, 'ReClave' )}
            />
            <Input
              inputStyle={{ fontSize: 16}}
              placeholder='Nombre *'
              keyboardType='default'
              value={ formData.Nombre }
              onChangeText={ (value) => onChange(value, 'Nombre' )}
            />
            <Input
              placeholder='Apellido *'
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.Apellido }
              onChangeText={ (value) => onChange(value, 'Apellido' )}
            />
            <Input
              placeholder='Direccion *'
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.Direccion }
              onChangeText={ (value) => onChange(value, 'Direccion' )}
            />
            <Input
              placeholder='Cod. Postal *'
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.CodPostal }
              onChangeText={ (value) => onChange(value, 'CodPostal' )}
            />
            <Input
              placeholder='Celular *'
              keyboardType='numeric'
              inputStyle={{ fontSize: 16}}
              value={ formData.Celular }
              onChangeText={ (value) => onChange(value, 'Celular' )}
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

            {selectedRegion.length > 0 && regionStatus && 
              <Input
                placeholder='Localidad  (opcional)'
                keyboardType='default'
                inputStyle={{ fontSize: 16}}
                value={ formData.Localidad }
                onChangeText={ (value) => onChange( value, 'Localidad' )}
              />
            }

            {selectedRegion.length > 0 && !regionStatus &&
            <Picker
              selectedValue={selectedCuentaHija}
              onValueChange={(itemValue, itemIndex) => setSelectedCuentaHija(itemValue)}
              mode='dialog'
              style={{ ...stylesGral.glTextInputLine, ...stylesGral.glPicker}}
              >
                  <Picker.Item label='Localidad *' value='' />
                { cuentasHijasData?.map( (cuentaHija: CuentasHijasData, index: any) => (
                  <Picker.Item key={ index} label={ cuentaHija.RazonSocial.toUpperCase()} value={ cuentaHija.IdCuentaHija } />
                  ))}
            </Picker>
            }

            <Input
              placeholder={ (regionStatus) ? 'Paquete *' : 'Paquete (Opcional)'} 
              keyboardType='default'
              inputStyle={{ fontSize: 16}}
              value={ formData.Paquete }
              onChangeText={ (value) => onChange( value, 'Paquete' )}
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



