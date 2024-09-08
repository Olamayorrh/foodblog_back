const express = require("express");
const User = require("./schema");
const router = express.Router();
const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");




//  insert image

// router.post("/", upload.single("image"), async(req, res)=>{
//     const result = await cloudinary.uploader.upload(req.file.path);
//     try {
//         res.json(result)
//     } catch (error) {
//         console.log(error);
//     }
// })

// insert a user into database route

router.post("/blog",upload.single("image"),async (req,res)=>{

    const result = await cloudinary.uploader.upload(req.file.path);

    try {
        const user = new User({
            title:req.body.title,
            
            description:req.body.description,

           category:req.body.category,
            
            image: result.secure_url,
           
            cloudinary_id:result.public_id
        });
        await user.save();
        res.send(user)
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

 });

// get all users

router.get("/blogs",async (req, res)=>{
    try {
        const users = await User.find({});
        res.send(users);
       
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});



// search by Name
router.get("/blog/:name", async (req, res)=>{
   const name = req.params.name;
   console.log(name);
    try {
        const users = await User.find({
            $or:[
                {name:{$regex:name,$options:"i"}}
                
            ]
        });
        
        
        res.json(users);
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

});

// update a user

router.put("/blog/:id", async (req,res)=>{
    const {id} = req.params;
    const {name, image} = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, {name,image}, {new:true});
        res.send(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// delete a user

router.delete("/blog/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        res.send(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

module.exports = router