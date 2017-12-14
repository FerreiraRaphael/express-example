module.exports = {
  development: {
    username: 'postgres',
    password: '',
    database: 'starter_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'starter_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'postgres',
    password: '',
    database: 'starter_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
