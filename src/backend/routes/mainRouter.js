const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');

function createMainRouter() {
    const mainRouter = express.Router();

    mainRouter.use(`/auth`, authRouter);
    mainRouter.use(`/user`, userRouter);
    mainRouter.use('/post', postRouter);
    mainRouter.use('/comment', commentRouter);

    return mainRouter;
}

module.exports = { createMainRouter };
