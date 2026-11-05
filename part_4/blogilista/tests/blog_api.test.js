const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { test, after, beforeEach } = require('node:test')
const api = supertest(app)

const assert = require('node:assert')
const helper = require('../utils/test_helper')


beforeEach(async () => {

    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)

})


test('all blogs are returned', async() => {

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs are returned as json', async() => {
     await api
    .get('/api/blogs')
     .expect(200)
     .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async() => {

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})