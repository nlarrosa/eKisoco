import React, { useState, useContext, useEffect, useRef } from 'react'
import { Text, ScrollView, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import { Divider, Switch, Icon, Input } from 'react-native-elements';


import { stylesGral } from '../../theme/generalTheme';
import { styleRegister } from '../../theme/registerTheme';
import { styleAccount } from '../../theme/accountTheme';
import { useForm } from '../../hooks/useForm';
import { ProvinciasPicker } from '../../components/ProvinciasPicker';
import { UserContext } from '../../context/UserContext';
import constColor from '../../constants/color';
import { ModalHouers } from '../../components/ui/ModalHouers';








export const AccountScreen = () => {

  const { getAccount, houersDays, deleteHouersDay } = useContext(UserContext);
  const [account, setAccount] = useState()
  const [provinciaSelected, setProvinciaSelected] = useState('');
  const [reparto, setReparto] = useState(false);
  const [entregaDiario, setEntregaDiario] = useState(false);
  const [entregaRevista, setEntregaRevista] = useState(false);
  const [cargaDiario, setCargaDiario] = useState(false);
  const [cargaRevista, setCargaRevista] = useState(false);
  const [cargaOpcionales, setCargaOpcionales] = useState(false);
  const [modalStatus, setModalStatus] = useState(true);


  const { onChange, formData, setFormValue, resetField} = useForm({
    Dni: '', Cuit: '', Provincia: '', Calles: '', 
    reparto, entregaDiario, entregaRevista, cargaDiario, cargaRevista, cargaOpcionales,
    calle1: '', calle2: '', calle3: '', calle4: '', calle5: '', calle6: '', calle7: '', calle8: '', calle9: '', calle10: '',
 });



  useEffect(() => {
      loadAccount();
  }, []);


  

  /** Obtiene los datos iniciales de la cuenta
   * del usuario con datos adicionales
   */
  const loadAccount = async() => {

    const account = await getAccount();

    setReparto(Boolean(account.TieneReparto));
    setEntregaDiario(account.EntregaSuscripcionDiario);
    setEntregaRevista(account.EntregaSuscripcionRevistas);
    setCargaDiario(account.CargaDiario);
    setCargaRevista(account.CargaRevista);
    setCargaOpcionales(account.CargaOpcionales);
    
    setFormValue({
      Dni: account.DNI, Cuit: account.CUIT, Provincia: account.Provincia, Calles: account.EntrecallesPuesto, 
      reparto, entregaDiario, entregaRevista, cargaDiario, cargaRevista, cargaOpcionales, 
      calle1: '', calle2: '', calle3: '', calle4: '', calle5: '', calle6: '', calle7: '', calle8: '', calle9: '', calle10: '',
    });

  }


  const saveAccountHandler = () => {

    setFormValue({
      ...formData,
      Provincia: provinciaSelected,
      reparto,
      entregaDiario,
      entregaRevista,
      cargaDiario,
      cargaRevista,
      cargaOpcionales,
    });
  }

  

  return (
    
    <KeyboardAvoidingView
        style={{ ...stylesGral.glSafeArea, flex: 1 }}
        behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
        keyboardVerticalOffset={ 100 }
    >
        <ScrollView style={ stylesGral.glScrollView } keyboardShouldPersistTaps='handled'>

          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>DNI</Text>
            <TextInput
              style={ stylesGral.glTextInputLine}
              placeholder='Solo números'
              keyboardType='default'
              value={ formData.Dni }
              onChangeText={ (value) => onChange( value, 'Dni')}
            />
          </View>
          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>CUIT</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Solo números'
              keyboardType='default'
              value={ formData.Cuit }
              onChangeText={ (value) => onChange( value, 'Cuit')}
            />
          </View>

          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Provincia</Text>
            <ProvinciasPicker 
              provSelected={provinciaSelected} 
              onChange={(value) => setProvinciaSelected(value)}
            />
          </View>

          <View style={ stylesGral.formControl }>
            <Text style={ stylesGral.glLabel }>Entre Calles</Text>
            <TextInput 
              style={ stylesGral.glTextInputLine}
              placeholder='Ej. Av. Rivadavia y Av. Escalada'
              keyboardType='default'
              value={ formData.Calles }
              onChangeText={ (value) => onChange( value, 'Calles')}
            />
          </View>

          <View style={{ ...styleAccount.checkContainer, marginTop: 20 }}>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Tiene Reparto?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ reparto } 
              onValueChange={ ( value ) => setReparto(value)} 
            />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de diarios?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ entregaDiario } 
              onValueChange={ (value) => setEntregaDiario(value) }
            />
          </View>
          
          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de revistas?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ entregaRevista } 
              onValueChange={ (value) => setEntregaRevista(value) }
            />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga diario?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ cargaDiario } 
              onValueChange={ (value) => setCargaDiario(value) }
            />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga revista?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ cargaRevista } 
              onValueChange={ (value) => setCargaRevista(value) } 
              />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga opcionales?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ cargaOpcionales } 
              onValueChange={ (value) => setCargaOpcionales(value) }
            />
          </View>

          <Divider width={4} color={ constColor.green } style={{ marginTop: 20 }}/>
          <Text style={ stylesGral.dividerHeader }>ZONA DE REPARTO</Text>
          <View style={{ ...stylesGral.formControl, marginTop: 20 }}>
            <Text style={ stylesGral.glLabel }>Poligono / Hasta 10 calles</Text>
                <Input 
                  placeholder='Calle N°1'
                  keyboardType='default'
                  value={ formData.calle1 }
                  onChangeText={ (value) => onChange(value, 'calle1')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => resetField( '', 'calle1') }
                    />
                  }
                />
                { formData.calle1.length > 0 && (
                  <Input 
                    
                    placeholder='Calle N°2'
                    keyboardType='default'
                    value={ formData.calle2 }
                    onChangeText={ (value) => onChange(value, 'calle2')}
                    rightIcon={
                      <Icon 
                        tvParallaxProperties={undefined}
                        type='ionicon'
                        name={ 'close-circle-outline'}
                        onPress={ () => resetField( '', 'calle2') }
                      />
                    }
                  />
                )}
                { formData.calle2.length > 0 && (
                  <Input 
                    style={{ marginBottom: 10,}}
                    placeholder='Calle N°3'
                    keyboardType='default'
                    value={ formData.calle3 }
                    onChangeText={ (value) => onChange(value, 'calle3')}
                    rightIcon={
                      <Icon 
                        tvParallaxProperties={undefined}
                        type='ionicon'
                        name={ 'close-circle-outline'}
                        onPress={ () => resetField( '', 'calle3') }
                      />
                    }
                  />
                )}
                { formData.calle3.length > 0 && (
                  <Input 
                    style={{ marginBottom: 10,}}
                    placeholder='Calle N°4'
                    keyboardType='default'
                    value={ formData.calle4 }
                    onChangeText={ (value) => onChange(value, 'calle4')}
                    rightIcon={
                      <Icon 
                        tvParallaxProperties={undefined}
                        type='ionicon'
                        name={ 'close-circle-outline'}
                        onPress={ () => resetField( '', 'calle4') }
                      />
                    }
                  />
                )}
                { formData.calle4.length > 0 && (
                <Input 
                  placeholder='Calle N°5'
                  keyboardType='default'
                  value={ formData.calle5 }
                  onChangeText={ (value) => onChange(value, 'calle5')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => resetField( '', 'calle5') }
                    />
                  }
                />
                )}
                { formData.calle5.length > 0 && (
                  <Input 
                  placeholder='Calle N°6'
                  keyboardType='default'
                  value={ formData.calle6 }
                  onChangeText={ (value) => onChange(value, 'calle6')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => resetField( '', 'calle6') }
                    />
                  }
                  />
                )}
                { formData.calle6.length > 0 && (
                  <Input 
                  placeholder='Calle N°7'
                  keyboardType='default'
                  value={ formData.calle7 }
                  onChangeText={ (value) => onChange(value, 'calle7')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => resetField( '', 'calle7') }
                    />
                  }
                  />
                )}
                { formData.calle7.length > 0 && (
                  <Input 
                  placeholder='Calle N°8'
                  keyboardType='default'
                  value={ formData.calle8 }
                  onChangeText={ (value) => onChange(value, 'calle8')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => resetField( '', 'calle8') }
                    />
                  }
                  />
                )}
                { formData.calle8.length > 0 && (
                  <Input 
                  placeholder='Calle N°9'
                  keyboardType='default'
                  value={ formData.calle9 }
                  onChangeText={ (value) => onChange(value, 'calle9')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => resetField( '', 'calle9') }
                    />
                  }
                  />
                )}
                { formData.calle9.length > 0 && (
                  <Input 
                  placeholder='Calle N°10'
                  keyboardType='default'
                  value={ formData.calle10 }
                  onChangeText={ (value) => onChange(value, 'calle10')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => resetField( '', 'calle10') }
                    />
                  }
                  />
                )}
          </View>
          

          <Divider width={4} color={ constColor.green } style={{ marginTop: 20 }}/>
          <Text style={ stylesGral.dividerHeader }>HORARIOS DE ATENCION (Lunes a Domingo)</Text>

          <View style={{ justifyContent: 'center', marginVertical: 20, }}>

            { Object.entries(houersDays).map( ([ key, day ]) => (
              <View key={ key } 
                style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                    borderBottomColor: constColor.greyDark, 
                    borderBottomWidth: 1,
                  }}>
                <Text  
                  style={{ 
                    fontSize: 16, 
                    width: '20%',
                    fontWeight: 'bold'
                  }}
                  >
                  { day.name }
                </Text>
                <Text
                  style={{ 
                    textAlign: 'center',
                    fontSize: 16, 
                    width: '20%'
                  }}
                >
                  { day.desde.length > 0 ? day.desde : '---'} hs.
                </Text>
                <Text style={{ fontSize: 17, width: '10%', textAlign: 'center', }}>a</Text>
                <Text
                  style={{ 
                    fontSize: 16, 
                    width: '20%'
                  }}
                >
                  { day.hasta.length > 0 ? day.hasta : '---' } hs.
                </Text>

                <TouchableOpacity
                  onPress={ () => deleteHouersDay(key) }
                >
                  <Icon 
                    tvParallaxProperties={undefined}
                    name='trash'
                    type='ionicon'
                    color={ constColor.green}
                  />
                </TouchableOpacity>
              </View>
            ))}

          </View>
          <View>
            <TouchableOpacity 
            onPress={ () => setModalStatus(!modalStatus) }
            style={{ 
              borderColor: constColor.green, 
              marginHorizontal: 80,
              padding: 10,
              borderRadius: 10,
              height: 65,
              marginBottom: 30,
              justifyContent: 'center'
            }}>
              
              <Icon 
                tvParallaxProperties={undefined}
                name='time-outline'
                type='ionicon'
                color={ constColor.green}
                size={ 40}
              />
              <Text style={{ 
                color: constColor.green,
                fontSize: 17,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>Agregar o Modificar</Text>
            </TouchableOpacity>
          </View>

          <Divider width={4} color={ constColor.green } style={{ marginTop: 20 }}/>
          <View style={ stylesGral.glFooterContainer }>
              <TouchableOpacity 
                style={ stylesGral.glButton }
              >
                <Text style={ stylesGral.glButtonText }>Guardar Cambios</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>

        <ModalHouers 
          status={ modalStatus }
          onClose={ () => setModalStatus(!modalStatus) }
        />
    </KeyboardAvoidingView>
  )
}



