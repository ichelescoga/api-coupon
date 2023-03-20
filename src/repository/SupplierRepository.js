const { dockerConnection } = require('../components/RegularConnection')
const { ExecuteSP } = require('../components/CustomRepository')

let SupplierRepository = function () {

    let getSupplier = async (params) => {
        return await ExecuteSP(dockerConnection, 'SP_GetProveedor(?)', params)
    }

    return {
        getSupplier    
    }

}

module.exports = SupplierRepository()