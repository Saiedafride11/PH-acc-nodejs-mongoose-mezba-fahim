const Product = require('../models/Product')


exports.getProductsService = async () => {
    const products = await Product.find({})
    return products
}

exports.createProductService= async(data)=>{
    const product =await Product.create(data)
    return product
}

// Single Update
exports.updateProductService= async (productId, data)=>{
    // const result = await Product.updateOne( {_id: productId}, {$set: data});

    // const result = await Product.updateOne( {_id: productId}, {$set: data}, {
    //     runValidators: true
    // });

    // const result = await Product.updateOne( {_id: productId}, {$inc: data}, {
    //     runValidators: true
    // });

    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
}

// multiple update
exports.bulkUpdateProductService= async (data)=>{
    // const result = await Product.updateMany( { _id: data.ids }, data.data, {
    //     runValidators: true
    // });


    const products = [];

    data.ids.forEach((product) => {
      products.push(Product.updateOne({ _id: product.id }, product.data));
    });
  
    const result = await Promise.all(products);
   
    return result;
}