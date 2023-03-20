const createError = require('http-errors')
const SupplierRepository = require('../repository/SupplierRepository')
const Security = require('../utils/security')
exports.HelloWorld = async (req, res, next) => {
    try{
        /*let nonce = Security.generateNonce()
        console.log("nonce:")
        console.log(nonce)
        Security.validateNoce(nonce)*/
        let nonce = '{"ciphertext":"Ff9EN2amQTHz8Cve59GaiSqsy4yx0HCrkA9QQ7v0+N4=","iv":"a3bfbc68663965013f975330cb58c37e","salt":"d904e3f1b732b16ae819df633eb56c0ca7a9857d94e1f70350ad93873ff6e367d3abdda8ea3193620fc53d1d4c581f9585bd1cb2b9c1c7652347a63b3195076667b8edde919b59aec15b9bf4d211862de231122d54a03e28bc0eedf50bbc215128890f87e1b4b711af0f97fc441dcb29cfe7213bc45dc33ae2e69c4e582fd597f2befbd69c91c206432d2d669aa4bf6fda0ca701f34988cdc5cec4d69e6a400a047116a9d23df22d3ccea11b8c7e3a5aaa101ac5fbd00de84ba4f325c450c97f53e13090076ac6dc3b9ac3eb73be8d3a1ec36806c8ac06009b88d9807729ef1e8506be58503291f204b7d650614b6b7e23a3b04921b5d0915ac1db67c4cd5034"}'
        console.log(Security.Decrypt("SMShort-Secret", nonce))
        console.log(new Date)
        res.json({
            success: true
        })
    }
    catch(error){
        console.log(error)
        next(createError(500))
    }
}

exports.CreatePost = async (req, res, next) => {
    try{
        console.log(req.body)
        console.log(req.params)
        console.log(req.query)
        let result = {}
        result.body = req.body
        result.params = req.params
        result.query = req.query
        res.json(result)
    }
    catch(error){
        console.log(error)
        next(createError(500))
    }
}

exports.UpdatePut = async (req, res, next) => {
    try{
        console.log(req.body)
        res.json({
            success: true
        })
    }
    catch(error){
        console.log(error)
        next(createError(500))
    }
}

exports.SelectGet = async (req, res, next) => {
    try{
        console.log(req.params.idSupplier)
        let params = {
            idSupplier: req.params.idSupplier
        }
        let result = await SupplierRepository.getSupplier(params)

        res.json(result)
    }
    catch(error){
        console.log(error)
        next(createError(500))
    }
}