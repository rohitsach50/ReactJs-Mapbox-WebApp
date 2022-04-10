import mongoose from "mongoose";
const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    actor: {
        type: Array
    },
    franchise: {
        type: String
    },
    synopsis: {
        type: String
    },
    year: {
        type: String,
        required: true
    }


})
export default mongoose.model('testSchema', testSchema)