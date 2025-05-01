// const asyncHandler = () => {}

const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}


// const ayncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

export {asyncHandler}

const asynHandler = (fn) => async(req,res,next) => {
    try{
        await fn(req,res,next)
    }
    catch(error){
        res.status(err.code || 500).json({
            sucess: false,
            message: err.message
        })
    }
}