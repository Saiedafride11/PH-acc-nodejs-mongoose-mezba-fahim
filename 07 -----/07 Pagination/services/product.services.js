const Product = require('../models/Product')


exports.getProductsService = async (filters, queries) => {
    // const products = await Product.find({})

    //http://localhost:5000/api/v1/product     **************************************************
    // const products = await Product.find({}).sort({price: 1})
    // const products = await Product.find({}).sort('quantity price')
    // const products = await Product.find(query)
    // const products = await Product.find({}).sort(queries.sortBy)
    // const products = await Product.find({}).sort(queries.sortBy).select('name description')
    // const products = await Product.find({}).sort(queries.sortBy).select(queries.fields)

    //http://localhost:5000/api/v1/product?price=12
    //http://localhost:5000/api/v1/product?price[gt]=12
    // http://localhost:5000/api/v1/product?sort=price,quantity&fields=name,description      **************************************************
    // const products = await Product.find(filters)
                        // .select(queries.fields)
                        // .sort(queries.sortBy)
    // return products 

    const products = await Product.find(filters)
                    .skip(queries.skip)
                    .limit(queries.limit)
                    .select(queries.fields)
                    .sort(queries.sortBy)
    const totalProducts = await Product.countDocuments(filters);
    const pageCount = Math.ceil( totalProducts / queries.limit );
    return { totalProducts, pageCount, products }
}

exports.createProductService= async(data)=>{
    const product =await Product.create(data)
    return product
}

// Single Update
exports.updateProductByIdService= async (productId, data)=>{
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

// single delete
exports.deleteProductByIdService = async (id)=>{
    const result = await Product.deleteOne( { _id: id });
   
    return result;
}

//multiple delete
exports.bulkDeleteProductService = async (ids) => {
    // const result = await Product.deleteMany({ _id: ids });
    const result = await Product.deleteMany({});
  
    return result;
  };