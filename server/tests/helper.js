import chai from 'chai';
import supertest from 'supertest';
import app from '../server';
import db from '../models/index';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.db = db;
