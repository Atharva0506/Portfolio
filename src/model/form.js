import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;