const AuthorModel = require("../models/authorModel");
const jwt = require('jsonwebtoken')


const createAuthor = async function (req, res) {
    try {
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const nameRegex = /^[a-z\s]+$/i
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

        //    --------------------------------------------bodyvalidation----------------------------------------------------------------------------
        let author = req.body
        if (Object.keys(author).length == 0) return res.status(400).send({ status:false, msg: "Body can't be Empty" })

        // -------------------------------------------------fname validation----------------------------------------------------------------------
        if (!author.fname) return res.status(400).send({ status: false, msg: "fname is required" })

        if (!author.fname.match(nameRegex)) return res.status(400).send({ status: false, msg: "Invalid format of fname" })

        // --------------------------------------------------lname validation --------------------------------------------------------------------
        if (!author.lname) return res.status(400).send({ status: false, msg: "lname is required" })

        if (!author.lname.match(nameRegex)) return res.status(400).send({ status: false, msg: "Invalid format of lname" })

        // --------------------------------------------------title validation----------------------------------------------------------------------
        if (!author.title) return res.status(400).send({ status: false, msg: "title must be present" })

       if(["Mr","Mrs","Miss"].indexOf(author.title)== -1)return res.status(400).send({status:false,msg:"title must follow the enum"})

        // -----------------------------------------------------email validation ------------------------------------------------------------
        
        if (!author.email) return res.status(400).send({ Status: false, msg: "email is required" })

        if (!author.email.match(emailRegex)) return res.status(400).send({ status: false, msg: "email must valid format " })

        //------------------------------------------ repeated email validation -------------------------------------

        let alreadyexistemail = await AuthorModel.findOne({ email: author.email })

        if (alreadyexistemail) return res.status(400).send({ status: false, msg: "email is already exist" })

        //----------------------------------------- password regex validation ----------------------------------
        
        if(!author.password) return res.status(400).send({status : false, msg : "Password is mandatory"})

        if (!author.password.match(passRegex)) return res.status(400).send({ status: false, msg: "Password must conatins 1 uppercase,lowercase,special character and has 8-15 characters" })
        
        //-------------------------Author is created ------------------------------------------------------------

        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({status:true ,msg:"author is created",data: authorCreated })
    }

    catch (err) {
        res.status(500).send({ status:false, error: err.message })

    }
};

//_____________________________________________Login User_____________________________________________-

let Login = async function (req, res) {
    try {
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

        let username = req.body.email
        let password = req.body.password

        if (!username || !password) {
            res.status(400).send({status:false, msg: "Username and Password is mandatory" })
        }
        if (!username.match(emailRegex)) return res.status(400).send({ status: false, msg: "Username is not in correct format" })

        if (!password.match(passRegex)) return res.status(400).send({ status: false, msg: "Password is not in correct format" })
        
        else {
            try {
                // Proper Login Details and User Found
                let validauthor = await AuthorModel.findOne({ email: username, password: password });

                let token = jwt.sign(
                    {
                        userId: validauthor._id.toString(),
                        organisation: "FunctionUp",
                    },
                    "PROJECT-1"   //Secrete key
                );

                res.setHeader("x-api-key", token);
                res.status(201).send({ status: true, data: token })
            }

            // In this case no User found with given login details
            catch (err) {
                res.status(401).send({ status:false,msg:"unauthorise author", error: err.message })
            }
        }
    }

    catch (err) {
        res.status(500).send({ status:false,msg:"server error", error: err.message })
    }
}



module.exports.createAuthor = createAuthor;
module.exports.Login = Login