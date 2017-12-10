/**
 * @module routes/users
 * @file /api/v1/user routes
 */

const express = require('express');
const httpStatus = require('http-status');

const { withApiError, withApiResponse } = require('../lib/helpers');
const { withBearerAuth } = require('../lib/middlawares');
const { User } = require('../models');

const router = express.Router();

router.route('/').post(
  /**
   * POST /api/user
   * Creates a user, given a Username and Password.
   * @function createUser
   * @param {Request} req Express Request.
   * @param {Object} req.body Request body.
   * @param {string} req.body.username User Username.
   * @param {string} req.body.password User Password.
   * @param {Response} res Express Response.
   */
  async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.create({
        name,
        email,
        password
      });
      withApiResponse({
        description: `User ${name} created`,
        body: { id: user.id, name, email }
      })(res);
    } catch (error) {
      withApiError({
        description: `Error while creating user: ${error.message}`,
        error,
        code: 'routes.users.createUser'
      })(res);
    }
  }
);

router.route('/me').get(
  withBearerAuth(
    /**
     * GET /api/user/me
     * Return the authenticated user info.
     * @function authenticatedUser
     * @param {Request} req Express Request.
     * @param {Object} req.user The current user object.
     * @param {Response} res Express Response.
     */
    async (req, res) => {
      try {
        const { id, name, email } = req.user;
        withApiResponse({
          description: `User ${name} info`,
          body: { id, name, email }
        })(res);
      } catch (e) {
        withApiError({
          description: 'Unathorized',
          code: 'routes.user.authenticatedUser',
          status: httpStatus.UNAUTHORIZED
        })(res);
      }
    }
  )
);

module.exports = router;
