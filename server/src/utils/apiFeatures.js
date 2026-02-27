export class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const excluded = ['page', 'sort', 'limit', 'fields', 'search'];
    const queryObj = { ...this.queryString };
    excluded.forEach((key) => delete queryObj[key]);
    this.query = this.query.find(queryObj);
    return this;
  }

  search(fields = ['name']) {
    if (this.queryString.search) {
      this.query = this.query.find({
        $or: fields.map((field) => ({ [field]: { $regex: this.queryString.search, $options: 'i' } })),
      });
    }
    return this;
  }

  sort() {
    this.query = this.queryString.sort
      ? this.query.sort(this.queryString.sort.split(',').join(' '))
      : this.query.sort('-createdAt');
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
