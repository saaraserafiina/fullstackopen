const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.
  find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)

})

blogsRouter.post('/', userExtractor, async (request, response) => {

  const user = request.user
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog === null) {
      return response.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user === undefined) {
    return response.status(403).json({ error: 'This blog has no creator and cannot be deleted'})
  }
  if (blog.user.toString() !== user.id.toString() ) {
      return response.status(403).json({ error: 'Blog cannot be deleted by other than creator'})
  }
  else {

      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
  }



})

blogsRouter.put('/:id', async (request, response) => {

  
  const { title, author, url, likes} = request.body
  const blog = await Blog.findById(request.params.id)
  
  if (blog === null) {
    response.status(404).end()

  } else {
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const savedBlog = await blog.save()
    response.json(savedBlog)
  }

})

module.exports = blogsRouter