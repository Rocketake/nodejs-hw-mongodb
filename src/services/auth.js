import createHttpError from 'http-errors';
import { usersCollection } from '../db/models/user.js';

import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { sessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await usersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await usersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await usersCollection.findOne({ email: email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  const newSession = createSession();

  await sessionsCollection.deleteOne({ userId: user._id });

  return await sessionsCollection.create({
    ...newSession,
    userId: user._id,
  });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await sessionsCollection.findOne({
    userId: sessionId,
    refreshToken: refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date(Date.now()) > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await sessionsCollection.deleteOne({ userId: sessionId, refreshToken });

  return await sessionsCollection.create({
    ...newSession,
    userId: session.userId,
  });
};

export const logoutUser = async ({ sessionId, refreshToken }) => {
  await sessionsCollection.deleteOne({ userId: sessionId, refreshToken });
};
