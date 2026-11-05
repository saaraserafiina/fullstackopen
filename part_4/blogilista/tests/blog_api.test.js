const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { test, after, beforeEach, describe } = require('node:test')
const api = supertest(app)

const assert = require('node:assert')
const helper = require('../utils/test_helper')


beforeEach(async () => {

    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)

})

describe('reading blogs', () => {

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

    test('blog has a field called id', async() => {

        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            assert.notStrictEqual(blog.id, undefined)
            assert.strictEqual(blog._id, undefined)
        })

    })

})

describe('adding blogs', () => {


    test('new blog can be added', async() => {
        await api
         .post('/api/blogs')
         .send(helper.newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
        const blogTitles = blogsAtEnd.map(n => n.title)
        assert(blogTitles.includes(helper.newBlog.title))

    })


})


after(async () => {
  await mongoose.connection.close()
})