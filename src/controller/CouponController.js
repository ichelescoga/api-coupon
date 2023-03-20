const createError = require('http-errors')
const CouponRepository = require('../repository/CouponRepository')
const Security = require('../utils/security')

exports.VerifyCoupon = async (req, res, next) => {
    try{
        let params = {
            couponId: req.params.couponId
        }
        let result = await CouponRepository.getCouponById(params)
        console.log(result)
        if (!result) {
            console.info("Coupon doesn't exist -" + params.couponId)
            res.json({
                success: false,
                responseType: 3,
                payload: result
            })
            return
        }

        res.json({
            success: true,
            payload: result
        })
    }
    catch(error){
        console.log(error)
        console.info(error)
        res.json({
            success: false,
            payload: error
        })
        return
        //next(createError(500))
    }
}

exports.GetCouponByCouponCode = async (req, res, next) => {
    try{
        console.log(req.query)
        let nonceHeader = req.header("nonce")
        let decryptHeader = 0
        if (nonceHeader){
            decryptHeader = parseInt(Security.Decrypt("SMShort-Secret", nonceHeader))
        }
        let currentTime = new Date()
        let unixCurrentTime = parseInt((currentTime.getTime() / 1000).toFixed(0))
        console.log(req.params.couponCode)
        let params = {
            couponCode: req.params.couponCode
        }
        let result = await CouponRepository.getCouponByCouponCode(params)
        console.log(result)
        /*console.log(req.header("nonce"))
        console.log(new Date(1628548393 * 1000))
        let nonce = '{"ciphertext":"Ff9EN2amQTHz8Cve59GaiSqsy4yx0HCrkA9QQ7v0+N4=","iv":"a3bfbc68663965013f975330cb58c37e","salt":"d904e3f1b732b16ae819df633eb56c0ca7a9857d94e1f70350ad93873ff6e367d3abdda8ea3193620fc53d1d4c581f9585bd1cb2b9c1c7652347a63b3195076667b8edde919b59aec15b9bf4d211862de231122d54a03e28bc0eedf50bbc215128890f87e1b4b711af0f97fc441dcb29cfe7213bc45dc33ae2e69c4e582fd597f2befbd69c91c206432d2d669aa4bf6fda0ca701f34988cdc5cec4d69e6a400a047116a9d23df22d3ccea11b8c7e3a5aaa101ac5fbd00de84ba4f325c450c97f53e13090076ac6dc3b9ac3eb73be8d3a1ec36806c8ac06009b88d9807729ef1e8506be58503291f204b7d650614b6b7e23a3b04921b5d0915ac1db67c4cd5034"}'
        nonce = '{"ciphertext":"bhmk6t4L5ef32E11RsDZcA==","iv":"0fd2bb55369c7ab6374785c8fec4b6d2","salt":"979432dc70d5afadf97b3b8a4e316ba41de435a47abf01f0d597cbf745dbab47f373240f6422688f8739a37b2d533569d8b51d0e377d655021ebdd439d8f321cfbdb0908178c068bd9a8d6c0c62dd9f11d7d2257ae87958c91e1f3cf6a7f63ac56073b2ff1f5b3f6d1e9e83428bf81c41fbe03bc12bd180c83718fdd4274293406ec0cd35f79b2386f3c7cf768eb141a4dfc02dc92ea82536b78a487e819cfbffffbbd1d0bec6db73a05284e7b9b934642d6f909c6d82fee727a815bc3976383b0998f9a074187d3ba3c80b9bbbd1404c57ee8e3c6061d145c112ffcb552feb06ee72dff626972e74f6e0a3ed94506eb4ea71d634a63fb5a9e99f96512bb65c5"}'
        console.log(Security.Decrypt("SMShort-Secret", nonce))
        console.log(new Date(Security.Decrypt("SMShort-Secret", nonce) * 1000))*/
        console.log(new Date(1628625249 * 1000))
        console.log(new Date(1628625268 * 1000))
        if (!result) {
            console.info("Coupon code doesn't exist: " + params.couponCode)
            res.json({
                success: false,
                responseType: 3,
                payload: result
            })
            return
        }

        res.json({
            success: true,
            payload: result,
            timeh: decryptHeader,
            timeu: unixCurrentTime
        })
    }
    catch(error){
        console.log(error)
        console.info(error)
        res.json({
            success: false,
            payload: error
        })
        return
        //next(createError(500))
    }
}

exports.VerifyCouponCode = async (req, res, next) => {
    try{
        console.log("Verify Coupon Status: "+ req.params.couponCode)
        console.info("Verify Coupon Status ", req.params.couponCode)
        let params = {
            couponCode: req.params.couponCode
        }
        let result = await CouponRepository.getCouponByCode(params)
        //console.log(result)
        if (!result) {
            console.info("Coupon doesn't exist -" + params.couponCode)
            res.json({
                success: false,
                responseType: 3,
                payload: result
            })
            return
        }
        else{
            //Cupon en estado inactivo
            if (result.activo === 0){
                console.info("Inactive Coupon ")
                res.json({
                    success: false,
                    responseType: 0,
                    payload: result
                })
                return
            }
            
            if (!isNaN(Date.parse(result.fecha_fin))){
                let currentTime = new Date()
                console.log(currentTime)
                //Cupon vencido
                if (currentTime > result.fecha_fin){
                    console.info("Inactive Coupon By Date ")
                    res.json({
                        success: false,
                        responseType: 1,
                        payload: result
                    })
                    return
                }
            }

            let cpn_productos = []
            let countCpnProducts = 0
            req.body.cpn_productos.forEach(product => {
                let findProduct = result.cpn_idsegmento_cpn_segmento.cpn_productos.find(element => element.sku === product.sku)
                if (findProduct){
                    countCpnProducts++
                    cpn_productos.push(findProduct)
                }
            });

            if (countCpnProducts === 0){
                console.info("Coupon without products from body request")
                res.json({
                    success: false,
                    responseType: 2,
                    payload: result
                })
                return                
            }

            res.json({
                success: true,
                payload: {
                    codigo: result.codigo,
                    cupon: result.cupon,
                    activo: result.activo,
                    monto_cupon: result.monto_cupon,
                    moneda: result.moneda,
                    pais: result.pais,
                    cupon_editable: result.cupon_editable,
                    minimun_spend: result.minimun_spend,
                    individual_use: result.individual_use,
                    usage_limit: result.usage_limit,
                    segmento: result.cpn_idsegmento_cpn_segmento.segmento,
                    tipo_descuento: result.cpn_idtipodesc_cpn_tipo_descuento,
                    cpn_productos: cpn_productos
                }
            })
            return
        }

        
    }
    catch(error){
        console.log(error)
        console.info(error)
        res.json({
            success: false,
            payload: error
        })
        return
        //next(createError(500))
    }
}

exports.exchangeCoupon = async (req, res, next) => {
    try{
        console.log("Exchange Coupon Status: "+ req.params.couponCode)
        console.info("Exchange Coupon Status ", req.params.couponCode)
        let params = {
            couponCode: req.params.couponCode
        }
        let result = await CouponRepository.getCouponByCouponCode(params)
        console.log(result)
        if (!result) {
            console.info("Coupon doesn't exist -" + params.couponCode)
            res.json({
                success: false,
                responseType: 3,
                payload: result
            })
            return
        }
        console.info("Get Coupon by Code ", result)
        params.tienda_canje = req.body.tienda_canje
        params.canjeado_wordpress = req.body.canjeado_wordpress
        params.canjeado_tienda = req.body.canjeado_tienda
        params.numero_orden = req.body.numero_orden
        await CouponRepository.exchangeCoupon(params)

        res.json({
            success: true,
            payload: result
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success: false,
            payload: error
        })
        return
        //next(createError(500))
    }
}

exports.getCouponStatus = async (req, res, next) => {
    console.log("Get Coupon Status: "+ req.params.couponCode)
    console.info("Get Coupon Status ", req.params.couponCode)
    try{
        let params = {
            couponCode: req.params.couponCode
        }
        let result = await CouponRepository.getCouponByCouponCode(params)
        
        console.log(result)
        if (!result) {
            console.info("Coupon doesn't exist -" + params.couponCode)
            res.json({
                success: false,
                responseType: 3,
                payload: result
            })
            return
        }
        console.info("Get Coupon by Code ", result)
        res.json({
            success: true,
            payload: result.activo ? true: false
        })
    }
    catch(error){
        console.log(error)
        console.info(error)
        /*res.json({
            success: false,
            payload: error
        })
        return*/
        next(createError(500))
        return
    }
}