const { getProductsService, createProductService, updateProductService, bulkUpdateProductService } = require("../services/product.services");


exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product
        //   .where("name").equals(/\w/)
        //   .where("quantity").gt(100).lt(600)
        //   .limit(2).sort({ qunatity: -1 })
        const products = await getProductsService();

        res.status(200).json({
            status: "success",
            data: products
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};

exports.createProduct = async (req, res, next) => {

    try {
        // save or create

        const result = await createProductService(req.body);

        result.logger();

        res.status(200).json({
            status: "success",
            message: "Data inserted successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message
        });
    }

};

// single update
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Data updated successfully",
            data: result
        })

    }catch(error) {
        res.status(400).json({
            status: "fail",
            message: "Could't update the product",
            error: error.message
        })
    }
}


// multiple update
exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req.body);

        res.status(200).json({
            status: "success",
            message: "Data updated successfully",
            data: result
        })

    }catch(error) {
        res.status(400).json({
            status: "fail",
            message: "Could't update the product",
            error: error.message
        })
    }
}