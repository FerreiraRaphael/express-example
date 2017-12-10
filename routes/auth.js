/**
 * @module routes/auth
 * @file /api/v1/auth routes
 */

const express = require('express');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');

const {
  withApiError,
  withApiResponse,
  createToken
} = require('../lib/helpers');
const { User } = require('../models');

const router = express.Router();

/**
 * Sends a invalid User email or Password error in JSON
 * @function invalidUserOrPassowrd
 * @param {Response} res Express Response
 */
const invalidUserOrPassowrd = error => res => {
  withApiError({
    description: 'Invalid User email or Password',
    code: 'routes.auth.authUser',
    error,
    status: httpStatus.UNAUTHORIZED
  })(res);
};

router.route('/').post(
  /**
   * POST /api/auth
   * Authenticate a user, and return it's token.
   * @function authUser
   * @param {Request} req Express Request.
   * @param {Object} req.body Request body.
   * @param {string} req.body.email User Email for authentication.
   * @param {string} req.body.password User Password for authentication.
   * @param {Response} res Express Response.
   */
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.find({ where: { email } });
      const validPassword = user
        ? await bcrypt.compare(password, user.password)
        : false;
      const token = validPassword ? await createToken(user.dataValues) : '';
      const { id, name } = user;
      if (validPassword)
        withApiResponse({
          description: `User ${name} was authenticated`,
          body: { token, user: { id, email, name } }
        })(res);
      else
        invalidUserOrPassowrd({
          message: user ? 'User password invalid' : 'User email not exists'
        })(res);
    } catch (e) {
      invalidUserOrPassowrd(e)(res);
    }
  }
);

module.exports = router;
