const db = require("../models");

let CouponRepository = function () {

    let getCouponById = async (params) => {
        return await db.models.cpn_cupon.findOne({
            where: {
                idcpn_cupon: params.couponId
            },
            include: [{
                model: db.models.cpn_segmento,
                as: "cpn_idsegmento_cpn_segmento",
                required: true
            },
            {
                model: db.models.cpn_tipo_descuento,
                as: "cpn_idtipodesc_cpn_tipo_descuento",
                required: true,
            }
        ]
        })
    }

    let getCouponByCode = async (params) => {
        console.log(params.couponCode)
        return await db.models.cpn_cupon.findOne({
            where: {
                codigo: params.couponCode
            },
            include: [{
                model: db.models.cpn_segmento,
                as: "cpn_idsegmento_cpn_segmento",
                required: true,
                include: [{
                    model:db.models.cpn_productos,
                    as: "cpn_productos",
                    required: true
                }]
            },
            {
                model: db.models.cpn_tipo_descuento,
                as: "cpn_idtipodesc_cpn_tipo_descuento",
                required: true,
            }
        ]
        })
    }

    let getCouponByCouponCode = async (params) => {
        console.log(params.couponCode)
        return await db.models.cpn_cupon.findOne({
            where: {
                cupon: params.couponCode
            },
            include: [{
                model: db.models.cpn_segmento,
                as: "cpn_idsegmento_cpn_segmento",
                required: true,
                include: [{
                    model:db.models.cpn_productos,
                    as: "cpn_productos",
                    required: true
                }]
            },
            {
                model: db.models.cpn_tipo_descuento,
                as: "cpn_idtipodesc_cpn_tipo_descuento",
                required: true,
            }
        ]
        })
    }

    let changeStateCoupon = async (params) => {
        await db.sequelize.transaction(async t => {
            await db.models.cpn_cupon.update({
                    activo: params.activate ? 1: 0,    
                },
                {
                    where: {
                        codigo: params.couponCode
                    }
                }
            )
        })
    }

    let exchangeCoupon = async (params) => {
        await db.sequelize.transaction(async t => {
            await db.models.cpn_cupon.update({
                    activo: 0,
                    fecha_canje: new Date(),
                    tienda_canje: params.tienda_canje,
                    canjeado_wordpress: params.canjeado_wordpress,
                    canjeado_tienda: params.canjeado_tienda,
                    numero_orden: params.numero_orden
                },
                {
                    where: {
                        cupon: params.couponCode
                    }
                }
            )
        })
    }

    return {
        getCouponById,
        getCouponByCode,
        getCouponByCouponCode,
        changeStateCoupon,
        exchangeCoupon
    }

}
module.exports = CouponRepository();