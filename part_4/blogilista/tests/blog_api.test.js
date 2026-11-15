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

    test('new blog can be added without likes', async() => {

        const response = await api
        .post('/api/blogs')
        .send(helper.blogWithNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length +1)
        assert.strictEqual(response.body.likes, 0)


    })

    test('new blog cannot be added without a title', async() => {

        const response = await api
        .post('/api/blogs')
        .send(helper.blogWithNoTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)


    })

    test('a new blog cannot be added without an url', async() => {

        await api
        .post('/api/blogs')
        .send(helper.blogWithNoUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })
})


describe('deleting blogs', () => {


    test('succeeds with status code 204 if id is valid', async() => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const ids = blogsAtEnd.map(b => b.id)
        assert(!ids.includes(blogToDelete.id))

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)

    })
})


after(async () => {
  await mongoose.connection.close()
})