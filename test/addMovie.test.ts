const app = require('../src/index') 
const supertest = require('supertest')
const request = supertest(app)
import { addMovie } from '../src/services/addMovie'

test("Checker", () => {
  expect(true).toBe(true)
});


