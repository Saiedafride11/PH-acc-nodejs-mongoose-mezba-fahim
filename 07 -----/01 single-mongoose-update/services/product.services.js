const Product = require('../models/Product')


exports.getProductsService = async () => {
    const products = await Product.find({})
    return products
}

exports.createProductService= async(data)=>{
    const product =await Product.create(data)
    return product
}

exports.updateProductService= async (productId, data)=>{
    // const result = await Product.updateOne( {_id: productId}, {$set: data});

    // const result = await Product.updateOne( {_id: productId}, {$set: data}, {
    //     runValidators: true
    // });

    // const result = await Product.updateOne( {_id: productId}, {$inc: data}, { //inc diya increment korbo. body te joto dibi, toto barbe
    //     runValidators: true
    // });

    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
}