const { Ficha } = require('../models/ficha.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createFicha = catchAsync(async (req, res, next) => {
    const {
        id_evaluacion,
        cartera, 
        tramo,
        agente,
        mes_llamada,
        fecha_llamada,
        semana_llamada,
        telefono,
        dni_cliente,
        resultado,
        hora_llamada,
        tmo_segundos,
        tipo_llamada,
        tipo_gestion,
        alerta,
        descripcion_alerta,
        motivo_no_pago,
        responsabilidad_no_fcr,
        motivo_no_fcr,
        audio_nombre,
        fecha_monitoreo,
        nombre_monitor,
        rol,
        hora_inicio,
        hora_fin,
        duracion_monitoreo,
        saludo_11,
        contactar_con_persona_12,
        identificacion_gestor_13,
        brindar_informacion_21,
        indagar_motivo_no_pago_22,
        asesorar_23,
        mantiene_sentido_urgencia_31,
        perseverancia_objetivo_32,
        reafirmar_acuerdos_41,
        despedida_cliente_42,
        escucha_activa_51,
        comunicacion_cliente_52,
        amabilidad_cliente_53,
        uso_herramientas_61,
        registro_gestiones_62,
        calificacion_final,
        observaciones,
        supervisor,
        tramo_estandar,
        tipo_ficha,
    } = req.body;

    const newFicha = await Ficha.create({
        id_evaluacion,
        cartera, 
        tramo,
        agente,
        mes_llamada,
        fecha_llamada,
        semana_llamada,
        telefono,
        dni_cliente,
        resultado,
        hora_llamada,
        tmo_segundos,
        tipo_llamada,
        tipo_gestion,
        alerta,
        descripcion_alerta,
        motivo_no_pago,
        responsabilidad_no_fcr,
        motivo_no_fcr,
        audio_nombre,
        fecha_monitoreo,
        nombre_monitor,
        rol,
        hora_inicio,
        hora_fin,
        duracion_monitoreo,
        saludo_11,
        contactar_con_persona_12,
        identificacion_gestor_13,
        brindar_informacion_21,
        indagar_motivo_no_pago_22,
        asesorar_23,
        mantiene_sentido_urgencia_31,
        perseverancia_objetivo_32,
        reafirmar_acuerdos_41,
        despedida_cliente_42,
        escucha_activa_51,
        comunicacion_cliente_52,
        amabilidad_cliente_53,
        uso_herramientas_61,
        registro_gestiones_62,
        calificacion_final,
        observaciones,
        supervisor,
        tramo_estandar,
        tipo_ficha,
    });

    res.status(201).json({
        status: 'success',
        newFicha,
    });
});

const getAllFichas = catchAsync(async (req, res, next) => {

    const fichas = await Ficha.findAll();

    res.status(200).json({
        status: 'success',
        fichas,
    });

});

const getFichasByUser = catchAsync(async (req, res, next) => {
    const { monitor } = req.params;

    const fichas = await Ficha.findAll({
        where: { nombre_monitor: monitor }
    });

    res.status(200).json({
        status: 'success',
        fichas,
    });

});

module.exports = {
    createFicha,
    getAllFichas,
    getFichasByUser
};