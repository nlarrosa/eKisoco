import React, { useState, useContext, useEffect, useRef } from 'react'
import { Text, ScrollView, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { Divider, Switch, Icon, Input } from 'react-native-elements';


import { stylesGral } from '../../theme/generalTheme';
import { styleRegister } from '../../theme/registerTheme';
import { styleAccount } from '../../theme/accountTheme';
import { useForm } from '../../hooks/useForm';
import { ProvinciasPicker } from '../../components/ui/ProvinciasPicker';
import { UserContext } from '../../context/UserContext';
import constColor from '../../constants/color';
import constGlobals from '../../constants/globals';
import { ModalHouers } from '../../components/ui/ModalHouers';
import { Loading } from '../../components/ui/Loading';




export const AccountScreen = () => {
  
  const { getAccount, houersDays, deleteHouersDay, messageProfile, removeErrorProfile, editAccount, isLoading } = useContext(UserContext);
  const [provinciaSelected, setProvinciaSelected] = useState('');
  const [modalStatus, setModalStatus] = useState<boolean>(true);
  const [houers, setHouers] = useState<{ [key: string]: { desde:string, hasta:string, status:boolean, color: string, name: string} }>({});



    /** Declaramos una variable con un objeto que contiene 
     * los distintos switchs y desestructuramos los objetos 
     * para poder utilizarlos
     */
    const [switchServices, setSwitchServices] = useState<{ [key:string]: boolean }>({
      reparto: false, 
      entregaDiario: false, 
      entregaRevista: false, 
      cargaDiario: false, 
      cargaRevista: false, 
      cargaOpcionales: false,
    });

    const { reparto, entregaDiario, entregaRevista, cargaDiario, cargaRevista, cargaOpcionales} = switchServices;



    /** Declaro una variable con un objeto que contenga las calles de la
     * zona de reparto para luego utiliuzarlas en el hooks del useForm
     */
    const [zonaReparto, setZonaReparto] = useState<{ [key:string]:string }>({
      calle1: '', 
      calle2: '', 
      calle3: '', 
      calle4: '', 
      calle5: '', 
      calle6: '', 
      calle7: '', 
      calle8: '', 
      calle9: '', 
      calle10: ''
    });

    const {  calle1, calle2, calle3, calle4, calle5, calle6, calle7, calle8, calle9, calle10 } = zonaReparto;



    /** Generamos el useForm para manejar los datos
     * del formulario desde una sola variable
     */
    const { onChange, formData, setFormValue, resetField} = useForm({
      Dni: '', Cuit: '', Provincia: '', Calles: '', 
      reparto, entregaDiario, entregaRevista, cargaDiario, cargaRevista, cargaOpcionales,
      calle1: '', calle2: '', calle3: '', calle4: '', calle5: '', calle6: '', calle7: '', calle8: '', calle9: '', calle10: '',
    });



    /** obtenemos una alerta con mensaje si existe y
     * viene del contexto
     */
    useEffect(() => {
      if(messageProfile.length === 0) 
      return;

      Alert.alert(
        constGlobals.titleError, 
        messageProfile, 
        [{ text: 'Aceptar', onPress: removeErrorProfile}]
      );
    }, [messageProfile]);



    /** Cargamos los datos de la cuenta si 
     * ya existen en la DB
     */
    useEffect(() => {
        loadAccount();
    }, []);


    /** Actualizamos la grilla de los horarios de 
     * atencion si modificamos el calendario
     */
    useEffect(() => {
      setHouers(houersDays);
    }, [houersDays])



   /** Obtiene los datos iniciales de la cuenta
   * del usuario con datos adicionales
   */
    const loadAccount = async() => {

      const account = await getAccount();

      setProvinciaSelected(account.Provincia);
      setHouers(houersDays);

      setSwitchServices({
        reparto: account.TieneReparto,
        entregaDiario: account.EntregaSuscripcionDiario, 
        entregaRevista: account.EntregaSuscripcionRevistas, 
        cargaDiario: account.CargaDiario, 
        cargaRevista: account.CargaRevista, 
        cargaOpcionales: account.CargaOpcionales,
      });

      setZonaReparto({
        calle1: account.ZonaRepartos.Calle01  || '', 
        calle2: account.ZonaRepartos.Calle02  || '', 
        calle3: account.ZonaRepartos.Calle03  || '', 
        calle4: account.ZonaRepartos.Calle04  || '', 
        calle5: account.ZonaRepartos.Calle05  || '', 
        calle6: account.ZonaRepartos.Calle06  || '', 
        calle7: account.ZonaRepartos.Calle07  || '', 
        calle8: account.ZonaRepartos.Calle08  || '', 
        calle9: account.ZonaRepartos.Calle09  || '', 
        calle10: account.ZonaRepartos.Calle10 || ''
      });

      
      setFormValue({
        Dni: account.DNI, 
        Cuit: account.CUIT, 
        Provincia: account.Provincia, 
        Calles: account.EntrecallesPuesto, 
        reparto: account.TieneReparto, 
        entregaDiario:account.EntregaSuscripcionDiario, 
        entregaRevista:account.EntregaSuscripcionRevistas, 
        cargaDiario:account.CargaDiario, 
        cargaRevista:account.CargaRevista, 
        cargaOpcionales:account.CargaOpcionales, 
        calle1:account.ZonaRepartos.Calle01 || '', 
        calle2:account.ZonaRepartos.Calle02 || '', 
        calle3:account.ZonaRepartos.Calle03 || '', 
        calle4:account.ZonaRepartos.Calle04 || '', 
        calle5:account.ZonaRepartos.Calle05 || '', 
        calle6:account.ZonaRepartos.Calle06 || '', 
        calle7:account.ZonaRepartos.Calle07 || '', 
        calle8:account.ZonaRepartos.Calle08 || '', 
        calle9:account.ZonaRepartos.Calle09 || '', 
        calle10:account.ZonaRepartos.Calle10 || '',
      });
    }



  /** si seleccionamos una provincia para cambiar
   * la agregamos al hook del formulario
   */
  const handlerSelectedProvincia = (value:string) => {

    setProvinciaSelected(value);
    setFormValue({ ...formData, Provincia: value,});
  }


  /** Cambiamos el estado de cualquiera de los switchs de 
   * servicios y al mismo tiempo actualizamos el valor en
   * el useForm
   */
  const onChangeSwitch = (value:boolean, field: string) => {

      setSwitchServices({
        ...switchServices,
        [field]: value
      });

      setFormValue({ ...formData, [field]:value });
  }


  /** Modificamos el estado de las calles de la zona de repsrto
   * y al mismo tiempo actualizamos el valor del formData
   */
  const onChangeZonaReparto = (value: string, field: string) => {
      setZonaReparto({
        ...zonaReparto,
        [field]: value
      });

      setFormValue({ ...formData, [field]:value });
  }




  const saveAccountHandler = () => {
      editAccount(formData, houers);
  }

  

  if(isLoading){
    return (<Loading />);
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
              onChange={(value) => handlerSelectedProvincia(String(value))}
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
              onValueChange={ ( value ) => onChangeSwitch(value, 'reparto') } 
            />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de diarios?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ entregaDiario } 
              onValueChange={ (value) => onChangeSwitch(value, 'entregaDiario') }
            />
          </View>
          
          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Entrega suscripciones de revistas?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ entregaRevista } 
              onValueChange={ (value) => onChangeSwitch(value, 'entregaRevista') }
            />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga diario?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ cargaDiario } 
              onValueChange={ (value) => onChangeSwitch(value, 'cargaDiario') }
            />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga revista?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ cargaRevista } 
              onValueChange={ (value) => onChangeSwitch(value, 'cargaRevista') } 
              />
          </View>

          <View style={ styleAccount.checkContainer }>
            <TouchableOpacity>
                <Text style={ styleRegister.ckeckText }>¿Carga opcionales?</Text>
            </TouchableOpacity>
            <Switch
              color={ constColor.green } 
              value={ cargaOpcionales } 
              onValueChange={ (value) => onChangeSwitch(value, 'cargaOpcionales') }
            />
          </View>

          <Divider width={4} color={ constColor.green } style={{ marginTop: 20 }}/>
          <Text style={ stylesGral.dividerHeader }>ZONA DE REPARTO</Text>
          <View style={{ ...stylesGral.formControl, marginTop: 20 }}>
            <Text style={ stylesGral.glLabel }>Poligono / Hasta 10 calles</Text>
                <Input 
                  placeholder='Calle N°1'
                  keyboardType='default'
                  value={ calle1 }
                  onChangeText={ (value) => onChangeZonaReparto(value, 'calle1')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => onChangeZonaReparto( '', 'calle1') }
                    />
                  }
                />
                { calle1.length > 0 && (
                  <Input 
                    
                    placeholder='Calle N°2'
                    keyboardType='default'
                    value={ calle2 }
                    onChangeText={ (value) => onChangeZonaReparto(value, 'calle2')}
                    rightIcon={
                      <Icon 
                        tvParallaxProperties={undefined}
                        type='ionicon'
                        name={ 'close-circle-outline'}
                        onPress={ () => onChangeZonaReparto( '', 'calle2') }
                      />
                    }
                  />
                )}
                { calle2.length > 0 && (
                  <Input 
                    style={{ marginBottom: 10,}}
                    placeholder='Calle N°3'
                    keyboardType='default'
                    value={ calle3 }
                    onChangeText={ (value) => onChangeZonaReparto(value, 'calle3')}
                    rightIcon={
                      <Icon 
                        tvParallaxProperties={undefined}
                        type='ionicon'
                        name={ 'close-circle-outline'}
                        onPress={ () => onChangeZonaReparto( '', 'calle3') }
                      />
                    }
                  />
                )}
                { calle3.length > 0 && (
                  <Input 
                    style={{ marginBottom: 10,}}
                    placeholder='Calle N°4'
                    keyboardType='default'
                    value={ formData.calle4 }
                    onChangeText={ (value) => onChangeZonaReparto(value, 'calle4')}
                    rightIcon={
                      <Icon 
                        tvParallaxProperties={undefined}
                        type='ionicon'
                        name={ 'close-circle-outline'}
                        onPress={ () => onChangeZonaReparto( '', 'calle4') }
                      />
                    }
                  />
                )}
                { calle4.length > 0 && (
                <Input 
                  placeholder='Calle N°5'
                  keyboardType='default'
                  value={ calle5 }
                  onChangeText={ (value) => onChangeZonaReparto(value, 'calle5')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => onChangeZonaReparto( '', 'calle5') }
                    />
                  }
                />
                )}
                { calle5.length > 0 && (
                  <Input 
                  placeholder='Calle N°6'
                  keyboardType='default'
                  value={ calle6 }
                  onChangeText={ (value) => onChangeZonaReparto(value, 'calle6')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => onChangeZonaReparto( '', 'calle6') }
                    />
                  }
                  />
                )}
                { calle6.length > 0 && (
                  <Input 
                  placeholder='Calle N°7'
                  keyboardType='default'
                  value={ calle7 }
                  onChangeText={ (value) => onChangeZonaReparto(value, 'calle7')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => onChangeZonaReparto( '', 'calle7') }
                    />
                  }
                  />
                )}
                { calle7.length > 0 && (
                  <Input 
                  placeholder='Calle N°8'
                  keyboardType='default'
                  value={ calle8 }
                  onChangeText={ (value) => onChangeZonaReparto(value, 'calle8')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => onChangeZonaReparto( '', 'calle8') }
                    />
                  }
                  />
                )}
                { calle8.length > 0 && (
                  <Input 
                  placeholder='Calle N°9'
                  keyboardType='default'
                  value={ calle9 }
                  onChangeText={ (value) => onChangeZonaReparto(value, 'calle9')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => onChangeZonaReparto( '', 'calle9') }
                    />
                  }
                  />
                )}
                { calle9.length > 0 && (
                  <Input 
                  placeholder='Calle N°10'
                  keyboardType='default'
                  value={ calle10 }
                  onChangeText={ (value) => onChangeZonaReparto(value, 'calle10')}
                  rightIcon={
                    <Icon 
                      tvParallaxProperties={undefined}
                      type='ionicon'
                      name={ 'close-circle-outline'}
                      onPress={ () => onChangeZonaReparto( '', 'calle10') }
                    />
                  }
                  />
                )}
          </View>
          

          <Divider width={4} color={ constColor.green } style={{ marginTop: 20 }}/>
          <Text style={ stylesGral.dividerHeader }>HORARIOS DE ATENCION (Lunes a Domingo)</Text>

          <View style={{ justifyContent: 'center', marginVertical: 20, }}>

            { Object.entries(houers).map( ([ key, day ]) => (
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
              onPress={ () => saveAccountHandler() }
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



