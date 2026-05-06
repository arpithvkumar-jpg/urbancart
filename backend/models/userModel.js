import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: Object, default: { firstName: '', lastName: '', phone: '', street: '', city: '', state: '', zipcode: '', country: '' } },
    cartData: { type: Object, default: {} }
}, { minimize: false, timestamps: true })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel