const Bluebird = require('bluebird');
const request = require('supertest');
const expect = require('expect.js');
const httpStatus = require('http-status');
const app = require('../app');
const { createToken } = require('../lib/helpers');
const models = require('../models');

const { User } = models;

describe('Route /user', () => {
  before(() => models.sequelize.sync());
  beforeEach(() =>
    Bluebird.all([
      User.destroy({
        where: {}
      })
    ])
  );

  describe('POST /user', () => {
    it('creates a user', async () => {
      await request(app)
        .post('/api/v1/user')
        .set('Accept', /application\/json/)
        .send({ name: 'John', password: '123456789', email: 'john@test.com' })
        .expect(httpStatus.OK);
      const count = await User.count();
      expect(count).to.be(1);
    });
  });

  describe('GET /user/me', () => {
    let user;
    let token;
    beforeEach(async () => {
      const data = {
        name: 'John',
        password: '123456789',
        email: 'john@test.com'
      };
      user = await User.create(data);
      token = await createToken(user.dataValues);
    });
    it('get the autheticated user info', async () => {
      await request(app)
        .get(`/api/v1/user/me`)
        .set('Accept', /application\/json/)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(httpStatus.OK);
    });

    it('get unauthorized response, if not logged In', async () => {
      await request(app)
        .get(`/api/v1/user/me`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
