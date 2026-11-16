const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { test, after, beforeEach, describe } = require('node:test')
const api = supertest(app)

const assert = require('node:assert')
const helper = require('../utils/test_helper')
const bcrypt = require('bcrypt')

let token

beforeEach(async () => {

    await User.deleteMany({})

    const pwHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'root', pwHash})

    await user
    .save()

} )



describe('adding users', () => {

    test('user with too short username cannot be added', async() => {

        const usersBefore = await helper.usersInDb()

        const response = 
        await api
        .post('/api/users')
        .send(helper.userWithShortUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAtEnd.length)
        assert(response.body.error.includes('shorter than the minimum allowed length'))

    })

    test('user with an existing username cannot be added', async () => {

        const usersBefore = await helper.usersInDb()

        const response = 
        await api
        .post('/api/users')
        .send(helper.userWithDuplicateUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAtEnd.length)
        assert(response.body.error.includes('Expected username to be unique'))

    })

    test('user with no username cannot be added', async () => {

        const usersBefore = await helper.usersInDb()

        const response = 
        await api
        .post('/api/users')
        .send(helper.userWithNoUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAtEnd.length)
        assert(response.body.error.includes('Path `username` is required.'))
    })


    test('user with no password cannot be added', async() => {

        const usersBefore = await helper.usersInDb()

        const response = 
        await api
        .post('/api/users')
        .send(helper.userWithNoPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAtEnd.length)
        assert(response.body.error.includes("Password is required and must be at least 3 characters."))


    })

    test('user with too short password cannot be added', async() => {
        const usersBefore = await helper.usersInDb()

        const response = 
        await api
        .post('/api/users')
        .send(helper.userWithShortPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAtEnd.length)
        assert(response.body.error.includes("Password is required and must be at least 3 characters."))

    })

    test('a valid user can be created', async () => {
        const usersBefore = await helper.usersInDb()

        await api
        .post('/api/users')
        .send(helper.validUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersBefore.length + 1, usersAtEnd.length)
        
        const userNames = usersAtEnd.map(n => n.username)
        assert(userNames.includes(helper.validUser.username))

    })
})






after(async () => {
  await mongoose.connection.close()
})