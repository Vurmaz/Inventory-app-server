const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors/index')
const Item = require('../models/Item')

const getAllCategories = async(req, res) => {
    const categories = ['Fruit', 'Vegetables']
    res.status(StatusCodes.OK).json({ categories })
}
const getCategory = async(req, res) => {
    let category = await Item.find({ category : req.params.category })
    if(!category){
        throw new NotFoundError('Category not found')
    }
    res.status(StatusCodes.OK).json({ category })
}

module.exports = { getAllCategories, getCategory }