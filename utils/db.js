const mongoose = require('mongoose');

class Database {
  constructor() {
    if (!Database.instance) {
      mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      this.connection = mongoose.connection;
      Database.instance = this;
    }
    return Database.instance;
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new Database();
