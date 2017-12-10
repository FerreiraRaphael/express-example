const Bluebird = require('bluebird');
const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../app');
const models = require('../models');

const { User } = models;

describe('Route /auth', () => {
  before(() => models.sequelize.sync());
  beforeEach(() =>
    Bluebird.all([
      User.destroy({
        where: {}
      })
    ])
  );

  describe('POST /auth', () => {
    const data = {
      name: 'John',
      password: '123456789',
      email: 'john@test.com'
    };
    beforeEach(async () => {
      await User.create(data);
    });
    it('login a user', async () => {
      await request(app)
        .post('/api/v1/auth')
        .set('Accept', /application\/json/)
        .send({ password: data.password, email: data.email })
        .expect(httpStatus.OK);
    });

    it('fails to login, when email or password is wrong', async () => {
      await request(app)
        .post('/api/v1/auth')
        .set('Accept', /application\/json/)
        .send({ password: '123123', email: data.email })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
