const responseMsgs = require('./responseMsgs')

const errorHandler = (res,er)=>{
    let errorResult;

    if(er.message){
        //database
        errorResult = er.message.split(',')
    }else if(er.errors[0]){
        //express validator
        errorResult = er.errors.map((e)=>e.msg)
    }else{
        //My Error
        errorResult = [er]
    }

    res.status(400).json({
        status : responseMsgs.FAIL,
        data : errorResult
    })
}

module.exports = errorHandler