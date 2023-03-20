const express = require('express')
const router = express.Router()
const ProductController = require('../controller/ProductController')
const CouponController = require('../controller/CouponController')
const responses = require('../utils/responses')

const callBackFunction = function (req, res, next) {
  next()
}

router.get('/healthcheck', (req, res) => {
  res.status(200).json(responses.webResponse(true, 'Health check ok'))
})

//Get Coupon structure by Id
router.get('/nonce', callBackFunction, ProductController.HelloWorld)
//Get Coupon structure by Id
router.get('/coupon/:couponId', callBackFunction, CouponController.VerifyCoupon)
//Get Coupon structure by Code
router.get('/coupon/code/:couponCode', callBackFunction, CouponController.GetCouponByCouponCode)
//Verify Coupon structure by Coupon code
router.post('/coupon/code/:couponCode', callBackFunction, CouponController.VerifyCouponCode)
//Exchange Coupon
router.post('/coupon/inactive/:couponCode', callBackFunction, CouponController.exchangeCoupon)
//Get Coupon status
router.get('/coupon/status/:couponCode', callBackFunction, CouponController.getCouponStatus)

module.exports = router
