const Register = require("../Model/user");

module.exports={
    Register:async(req,res)=>{
        try {
            const user = await Register.create(req.body)
            return res.status(200).json({
                status_code:200,
                message:"success",
                data:user
            });
        } catch (error) {
            return res.status(200).json({
                status_code:500,
                message:error.message,
                data:[]
            });
        }
    }
}
