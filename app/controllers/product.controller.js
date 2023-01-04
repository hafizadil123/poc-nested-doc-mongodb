import Categories from '../models/categories';
import Product from '../models/product';
import BaseController from './base.controller';
class UsersController extends BaseController {
	whitelist = [
        'productName',
        'userId',
        'categories',
        'createdBy'
    ];

     categoryWhiteList = ['categoryName', 'userId', 'parentId']

    getProduct = async (req, res, next) => {
        try {
            const products = await Product.find({}).populate('userId').exec();
            res.status(200).json({
                products
            })

        } catch(err) {
            next(err);
        }
    }
	createProduct = async (req, res, next) => {	 
	  try {
		// start code from here
        const params = this.filterParams(req.body, this.whitelist);
    
        const product = new Product(params)
        console.log('parss', product)
       const isProductCreated = await product.save();
       console.log('aaaa', isProductCreated)
       if(isProductCreated) {
        return res.status(200).json({
            status: 200,
            message: 'product has been created',
            product
        })
       } else {
        return res.status(200).json({
            status: 400,
            message: 'product does not created'

        })
       }
      
	  } catch (err) {
	    err.status = 400;
	    next(err);
	  }
	};

    addCategory = async(req, res, next) => {
        try {
            const params = this.filterParams(req.body, this.categoryWhiteList)
            const category = new Categories(params);
            const isCreated = await category.save();
            if(isCreated) {
                return res.status(200).json({
                    status: 200,
                    message: 'category has been created',
                    category
        
                })
               } else {
                return res.status(200).json({
                    status: 400,
                    message: 'category does not created'
        
                })
            }
        } catch(err){
            next(err)
        }
    }
}

export default new UsersController();
