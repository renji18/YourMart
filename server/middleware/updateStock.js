const ProductData = require('../models/productSchema')

const updateStock = async(productId, productQuantity, keyword) => {
  try {
    const foundProduct = await ProductData.findOne({_id:productId})

    if(keyword === 'shipping'){
      foundProduct.stock -= productQuantity
    } else if(keyword === 'deleting'){
      foundProduct.stock += productQuantity
    }
    await foundProduct.save()
    return
  } catch (error) {
    console.log('Error while updating stock count');
  }
}

module.exports=updateStock