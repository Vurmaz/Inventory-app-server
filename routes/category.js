const express = require('express')
const router = express.Router()

const { getAllCategories, getCategory } = require('../controllers/category')

router.route('/').get(getAllCategories)
router.route('/:category').get(getCategory)

module.exports = router