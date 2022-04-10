import mongoose from "mongoose";
const test2schema = mongoose.Schema({
    data:{
        type:Array
    }
})

export default mongoose.model("Test",test2schema)