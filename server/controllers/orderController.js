const OrderData = require('../models/orderSchema')
const updatStock = require('../middleware/updateStock')


// Create Order
const createOrder = async (req, res, next) => {
  try {
    const userInfo = req.user
    const newOrder = new OrderData(req.body)
    newOrder.user = userInfo._id
    await newOrder.save()
    return res.status(201).json({ msg: "Success", newOrder })
  } catch (error) {
    return res.status(404).json({ msg: "Error", error })
  }
}

// Get Single Order
const getSingleOrder = async (req, res, next) => {
  try {
    const { _id } = req.params
    const foundOrder = await OrderData.findOne({ _id })
    if (!foundOrder)
      return res.status(404).json({ msg: "No order with the provided id" })

    return res.status(201).json({ msg: "Success", foundOrder })

  } catch (error) {

    return res.status(201).json({ msg: "Error", error })
  }
}

// Get My Orders
const getMyOrder = async (req, res, next) => {
  try {
    const order = await OrderData.find({ user: req.user._id })
    if (!order || order.length === 0)
      return res.status(201).json({ msg: "No orders by you yet" })

    return res.status(201).json({ msg: "Success", order })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}

// Get All Orders  --Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderData.find()
    if (!orders || orders.length === 0)
      return res.status(201).json({ msg: "No orders yet" })

    return res.status(201).json({ msg: "Success", orders })
  } catch (error) {

  }
}

// Update Order Status  --Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { _id } = req.params
    const { status } = req.body
    const foundOrder = await OrderData.findOne({ _id })
    if (!foundOrder)
      return res.status(404).json({ msg: "No order with the provided id" })
    if (foundOrder.orderStatus === 'Delivered')
      return res.status(201).json({ msg: "The product is already Delivered" })
    if (status === 'Shipped' || status === 'Delivered')
      foundOrder.orderItems.forEach(async (obj) => {
        await updatStock(obj.product, obj.quantity, 'shipping')
      })
    foundOrder.orderStatus = status
    if (status === 'Delivered')
      foundOrder.deliveredAt = Date.now()
    await foundOrder.save()
    return res.status(201).json({ msg: "Success", foundOrder })
  } catch (error) {
    return res.status(500).json({ msg: "Error", error })
  }
}

// Delete Order  --Admin
const deleteOrder = async (req, res, next) => {
  try {
    const { _id } = req.params
    const foundOrder = await OrderData.findOne({ _id })
    if (!foundOrder)
      return res.status(404).json({ msg: "No order with the provided id" })
    if (foundOrder.orderStatus === 'Delivered')
      return res.status(201).json({ msg: "The product is already Delivered" })
    if (foundOrder.orderStatus === 'Shipped')
      foundOrder.orderItems.forEach(async (obj) => {
        await updatStock(obj.product, obj.quantity, 'deleting')
      })
    const deleted = await OrderData.findOneAndDelete({ _id })
    return res.status(201).json({ msg: "Success", deleted })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}



module.exports = {
  createOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,

}