import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    categoryName: {
        type: String,
        default: '',
        required: true
    },
    userId: {
        type: { type: Schema.Types.ObjectId, ref: 'users' },
    },
    parentId: {
        type: { 
            type: Schema.Types.ObjectId,
            default: null
         },
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Categories = mongoose.model('categories', categoriesSchema);
export default Categories;
