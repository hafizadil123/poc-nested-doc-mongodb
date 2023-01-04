import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const productSchema = new Schema({
    productName: {
        type: String,
        default: '',
        required: true
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users' 
    },
    categories: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Product = mongoose.model('products', productSchema);
export default Product;
