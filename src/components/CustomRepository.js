const util = require('util')

exports.ExecuteSP = async( conn, storeProcedure, params) => {
    try{
        const query = util.promisify(conn.query).bind(conn)

        let paramsArray = Object.keys(params).reduce((array, key) => {
            array.push(params[key])
            return array
        }, [])

        let result = await query(`CALL ${storeProcedure}`, paramsArray);
        return result
    }
    catch(error){
        console.error(error)
        throw error
    }
}