'use strict'
const CryptoJS = require('crypto-js')
const shortSecret = 'SMShort-Secret'
const secret = 'SMSecret-Hash'

function generateNonce(){
    let nonceJson = {
        date: new Date().toUTCString(),
        user: 12345
    }
    let message = `${JSON.stringify(nonceJson)}`
    let sha1 = CryptoJS.SHA1(message, shortSecret)
    console.log("sha1:")
    console.log(sha1)
    let sha1ToString = sha1.toString(CryptoJS.enc.Base64)
    console.log(typeof sha1)
    console.log(sha1ToString)
    let sha1Parse =CryptoJS.enc.Base64.parse(sha1ToString) 
    console.log(sha1Parse)
    let wordsSha1 = {}
    wordsSha1.words = sha1Parse.words
    wordsSha1.sigBytes = sha1Parse.sigBytes
    console.log(wordsSha1)
    
    let phpSha1 = CryptoJS.enc.Base64.parse('3ce61dd5aa13450df9b9d899c5e7a8888a72cbc8')
    let wordPhpSha1 = {}
    wordPhpSha1.words = phpSha1.words
    wordPhpSha1.sigBytes = phpSha1.sigBytes
    console.log(wordPhpSha1)
    let nonce = CryptoJS.AES.encrypt(`${message}&&${JSON.stringify(wordPhpSha1)}`, secret)
    nonce = "aTFPNTBFZVR3SzdENDZjL1ZWMDQza3A0NWhtcjZQcEVHNEtXdEJYOW9QZ0gxdC9WaVBEaFV5c3BKdWRoSzNnMVZHWUZ2YVVIaE1xOTNHcERXRy9nbHc9PQ=="
    return nonce.toString()
}

function validateNoce(nonce){
    try {
        let bytes = CryptoJS.AES.decrypt(nonce, secret)
        console.log("bytes")    
        console.log(bytes)
        let text = bytes.toString(CryptoJS.enc.Utf8)
        console.log("text")    
        console.log(text)
        let data = text.split('&&')
        //console.log(data)
        let message = `${data[0]}&&${data[1]}`
        let sha1 = CryptoJS.HmacSHA1(message, shortSecret)
        /*let info = JSON.parse(data[0])
        console.log(info)*/
    } catch (error) {
        if (error.status) throw error
        else {
        console.log(error)
        throw createError(401, 'There was an error with the access token, please log in again')
        }
    }
}

function Decrypt(passphrase, encrypted_json_string){
    var obj_json = JSON.parse(encrypted_json_string);

    var encrypted = obj_json.ciphertext;
    var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
    var iv = CryptoJS.enc.Hex.parse(obj_json.iv);   

    var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64/8, iterations: 999});


    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv});

    return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = { generateNonce, validateNoce, Decrypt}