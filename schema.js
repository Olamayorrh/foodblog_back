const mongoose = require("mongoose");
const { any } = require("./utils/multer");
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },

    description: {
        type: String,
        required:true
    },

    image: {
        type:String,
        
    },

    category: {
        type: String,
        required:true
    },

    cloudinary_id: {
        type:String,
        required:false
        
    },
   
    created: {
        type:Date,
        required: true,
        default: Date.now
    }
});

    const User = mongoose.model("User", userSchema);

module.exports = User;