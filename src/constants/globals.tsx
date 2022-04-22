export default {

    /** IMAGES URLS */
    logoComplete : require('../../assets/logoln.png'),
    logotipo: require('../../assets/icon.png'),


    /** GENERALES */
    regionAmba: 'YDC',
    regionInterior: 'YDI',
    emailRegex: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    celularRegex: /^[0-9]+$/,


    /** MESSAGES USERS */
    requiredFieldMsg: 'Complete los campos obligatorios (*)',
    requiredEmailMsg: 'El campo email es incorrecto',
    requiredTermsMsg: 'Debe aceptar los términos y condiciones',
    requiredPakageMsg: 'Complete el campo Paquete',
    invalidEmailMsg: 'Ingrese un email válido',
    invalidPhoneMsg: 'El formato del celular es incorrecto',
    passConfirmMsg: 'Las claves ingresadas no coinciden',
    titleAttention: 'Atención!',
    titleExit: 'Exito!',
    titleError: 'Error!',


    /** MESSAGES PRODUCTS */
    productNoDataMsg: ' No se encontraron resultados para esta busqueda',
    disabledReposityMsg: 'Usuario deshabilitado para carga de reposiciones, comuníquese con su distribuidor',


    /** MESSAGES ACCOUNTS */
    HouerOpenMsg: 'El horario de apertura debe ser menor al horario de cierre',
    profileUpdateMsg: 'Perfil de vendedor actualizado.',
    accountUpdateMsg: 'Perfil de cuenta actualizado',
    confirmDistriMsg: 'Confirme los datos de su distribuidor',
    confirmLocalMsg: 'Confirme los datos de su distribuidor y su localidad',


    /** MESSAGES ORDERS */
    loadOrdersMsg: 'No existen mas resultados!',


    /** MESSAGES CART */
    cartProductMsg: 'Pedido generado correctamente',
    cartProductExistMsg: 'El artículo ya se encuentra agregado al carrito',
    productAddCartMsg: 'Artículo agregado al carrito',
    deleteProductMsg: "Desea borrar el producto seleccionado?",
    confirmProductMsg: 'Desea confirmar el pedido?',
    emptyCartMsg: 'El carrito se encuentra vacio.',
}