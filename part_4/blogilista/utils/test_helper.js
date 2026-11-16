const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [

  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const newBlog = {

    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  
}

const blogWithNoLikes =   {

    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"  
  
} 

const blogWithNoTitle = {

  author: "John Doe",
  url: "http://noTitleBlog.com/"

}

const blogWithNoUrl = {

  title: "Blog With No Url",
  author: "John Doe"

}

const usersInDb = async () => {

  const users = await User.find({})
  return users.map(user => user.toJSON())

}

const userWithShortUsername = {

  username: "xx",
  name: "John Doe",
  password: "salasana"

}

const userWithDuplicateUsername = {


  username: "root",
  password: "salasana1"

}

const userWithNoUsername = {

  password: "salasana"

}

const userWithShortPassword = {

  username: "testuser",
  password: "xx"

}

const userWithNoPassword = {

  username: "testuser",
  

}

const validUser = {

  username: "testuser",
  name: "Test User",
  password: "password"
}

module.exports = {

    initialBlogs,
    blogsInDb,
    newBlog,
    blogWithNoLikes,
    blogWithNoTitle,
    blogWithNoUrl,
    usersInDb,
    userWithDuplicateUsername,
    userWithShortUsername,
    userWithNoUsername,
    userWithShortPassword,
    userWithNoPassword,
    validUser

}