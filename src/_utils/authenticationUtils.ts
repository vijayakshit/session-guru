// const { requiresAuth } = require('express-openid-connect');
import { Request, Response } from 'express';
import crypto from 'crypto';

const salt = '';

export const generatePasswordHash = (password: string): string => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};

export const doesPasswordMatchHash = (
  password: string,
  originalHash: string
): boolean => {
  if (!password || !originalHash) return false;
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex') === originalHash;
};
