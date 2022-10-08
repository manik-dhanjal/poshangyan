const uuid = require('uuid')
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Admin = require("../schema/admin.schema");

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate
        if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });

        const admin = await Admin.findOne({ email: email });

        if (!admin)
        return res.status(400).json({ msg: "No account with this email has been registered." });
        
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) 
        return res.status(400).json({ msg: "Invalid credentials." });
        
        const token = jwt.sign({ id: admin._id }, process.env.PG_JWT_SECRET);
        res.json({token,admin: {id: admin._id,displayName: admin.displayName,},});

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.user);res.json(deletedAdmin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Check if token is

router.get("/", auth, async (req, res) => {
    const admin = await Admin.findById(req.user);
    res.json({displayName: admin.displayName,id: admin._id,});
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        console.log(token)
        if (!token) 
            return res.json(false);
            const verified = jwt.verify(token, process.env.PG_JWT_SECRET);

        if (!verified) 
            return res.json(false);
            const admin = await Admin.findById(verified.id);

        if (!admin) 
            return res.json(false);

        return res.json(true);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

exports.addAdmin = (req,res) => {
    let newAdmin = {
        username: req.body.username,
        password: req.body.password
    }
    if(req.body.username && req.body.password && req.body.verified){
                new Admin(newAdmin).save().then((s)=>{
                    // console.log(s);
                    res.status(200).send({message:'successfully added'})
                }).catch(e=>{
                    res.status(500).send({err:'something went wrong!!'})
                    console.log(e);
                })

    }else{
        res.status(500).send({err:'something went wrong!!'})
    }
}

exports.login = (req,res) =>{
    let admin = {
        username: req.body.username,
        password: req.body.password
    }
    let sent = false;
    if(req.body.username && req.body.password){
        Admin.find()
        .then(doc=>{
            doc.forEach(dat=>{
                if(dat.username===admin.username){
                    if(dat.password===admin.password){
                        let passKEY = uuid.v4();
                        dat.uuid = passKEY;
                        sent=true;
                        res.send({passkey:passKEY})
                        return dat.save();
                    }else{
                        sent=true;
                        res.status(401).send({message:'Wrong password!!'})
                        return '';
                    }
                }
            })
            if(!sent)
            res.status(401).send({message:'Please check username and password!!'})
            return '';
        }).then(()=>{
            return '';
        })
    }else{
        res.status(500).send({err:'something went wrong!!'})
    }
}

exports.validAdmin = (req,res) => {
    res.status(200).send({msg:true});
}
module.exports = router;