/**
 * @module routes/index
 * @file /api/v1/ routes
 */

const express = require('express');

const userRoutes = require('./users');
const authRoutes = require('./auth');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
