import React, { useEffect, useState } from 'react'
import { Modal, View, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';

import constColor from '../../constants/color';
import { styleRegister } from '../../theme/registerTheme';


interface Props {

    visible: boolean,
    distribuidor: string | undefined,
    localidad: string | undefined,
    close: () => void,
    confirm: () => void,
}

export const ConfirmDistri = ( props: Props ) => {

    const { visible, distribuidor, localidad} = props;
    const [msgeModal, setMsgeModal] = useState<string>('');
    const [localidadStatus, setLocalidadStatus] = useState<boolean>(false)


    useEffect(() => {

        setMsgeModal('Confirme los datos de su distribuidor');
        setLocalidadStatus(false);


        if(String(localidad).length > 0) {
           setMsgeModal('Confirme los datos de su distribuidor y su localidad');
           setLocalidadStatus(true);
        }

    }, [localidad, distribuidor])




  return (
    
    <Modal
    animationType="fade"
    transparent={false}
    visible={visible}
    onRequestClose={ props.close }
    >
        <View style={styleRegister.contentModal}>
            <View>
                <View>
                    <Icon 
                        tvParallaxProperties={ undefined}
                        type='ionicon'
                        name='information-circle-outline'
                        color={constColor.grey}
                        size={ 50 }
                    />
                    <Text style={ styleRegister.headerTitleModal }>IMPORTANTE!</Text>
                    <Text style={ styleRegister.headerSubtitleModal }>Antes de finalizar el registro</Text>
                    <Text style={ styleRegister.msgModal }>{ msgeModal }</Text>
                    <View style={ styleRegister.contentInfoModal}>
                        <Text>Distribuidor:</Text>
                        <Text style={{ fontWeight: 'bold'}}>{ distribuidor }</Text>
                    </View>
                    
                    { localidadStatus && (
                        <View style={ styleRegister.contentInfoModal}>
                            <Text>Localidad:</Text>
                            <Text style={{fontWeight: 'bold'}}>{ localidad }</Text>
                        </View>
                    )}
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Pressable onPress={ props.close } style={ styleRegister.btnConfirmModal}>
                        <Text style={ styleRegister.textBtnConfirmModal}>Aceptar</Text>
                    </Pressable>
                    <Pressable onPress={ props.close } style={ styleRegister.btnEditModal}>
                        <Text style={ styleRegister.textBtnEditModal}>Modificar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
  )
}
