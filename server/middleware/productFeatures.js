class ApiFeature {
  constructor(query, queryString) {
    this.query = query,
      this.queryString = queryString
  }
  search() {
    const keyword = this.queryString.keyword
      ?
      {
        name: {
          $regex: this.queryString.keyword,
          $options: 'i'
        }
      }
      :
      {}
    this.query = this.query.find({ ...keyword })
    return this
  }
  pagination(productsPerPage) {
    const currentPage = this.queryString.page || 1
    const skip = productsPerPage * (currentPage - 1)
    this.query = this.query.limit(productsPerPage).skip(skip)
    return this
  }
  filter() {
    const queryCopy = { ...this.queryString }
    const removeFields = ['keyword', 'page', 'limit']
    removeFields.forEach(key => delete queryCopy[key])
    let queryString = JSON.stringify(queryCopy)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
    this.query = this.query.find(JSON.parse(queryString))
    return this
  }
}

module.exports = ApiFeature