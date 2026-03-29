const { show } = require("../components.js")
const userModel = require("./db.schema.js")


const createUser = async (req,res) => {
    try{
        const {email,name,envKey,lockerRoom} = req.body

        const existEmail = await userModel.findOne({email})
        if (existEmail){
            return(
                res.status(400).json({
                    success : false,
                    msg : "user already exists !!"
                })
            )
        }

        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', { hour12: false }); 
        const day = now.toLocaleString('en-US', { weekday: 'long' });
        const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        const formatted = `${time} ${day} ${date}`;

        dateCreated = formatted

        const user = new userModel({
            email,
            name,
            envKey,
            dateCreated : formatted,
            lockerRoom})
        await user.save()

        res.json({
            success : true,
            data : user,
        })
    }
    catch(err){
        show("Failed to create user")
        res.status(500).json({error : err.message})
    }
}

module.exports = createUser

