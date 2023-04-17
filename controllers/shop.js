const { StatusCodes } = require('http-status-codes')
const Item = require('../models/Item')
const { NotFoundError } = require('../errors/index')

const getAllProducts = async(req, res) => {
    const items = await Item.find({})
    res.status(StatusCodes.OK).json({ items })
}

const getProduct = async(req, res) => {
    const item = await Item.findOne({ _id:req.params.id })
    if(!item){
        throw new NotFoundError('Product not found')
    }
    res.status(StatusCodes.OK).json({ item })
}
const createProduct = async(req, res) => {
    const item = await Item.create(req.body)
    res.status(StatusCodes.CREATED).json({ item })
}
const deleteProduct = async(req, res) => {
    const item = await Item.findByIdAndRemove({ _id:req.params.id })
    if(!item) {
        throw new NotFoundError('Product not found')
    }
    res.status(StatusCodes.OK).json({ item })
}
const updateProduct = async(req, res) => {
    const item = await Item.findOneAndUpdate({_id:req.params.id}, req.body, { new: true, runValidators: true })
    if (!item) {
    throw new NotFoundError(`No job with id ${req.params.id}`)
  }

    res.status(StatusCodes.OK).json({ item })

}

module.exports = { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct }