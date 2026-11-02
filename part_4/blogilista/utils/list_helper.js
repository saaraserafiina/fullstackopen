const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}
const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    return blogs.reduce((best, current) => best.likes > current.likes ? best : current)
}

const mostBlogs = (blogs) => {

    const blogAuthors = {}

    if (blogs.length === 0) {
        return null
    }
    for (const blog of blogs) {
        if (blogAuthors[blog.author]) {
            blogAuthors[blog.author] = blogAuthors[blog.author] +1
        } else {
            blogAuthors[blog.author] = 1
        }
    }
    const winner= Object.entries(blogAuthors).reduce((most, current) => most[1] > current[1] ? most : current)


    const result = {
        author: winner[0],
        blogs: winner[1]
    }

    return result

}

const mostLikes = (blogs) => {

    const authorLikes = {}

    if (blogs.length === 0) {
        return null
    }

    for (const blog of blogs) {
        if (authorLikes[blog.author]) {
            authorLikes[blog.author] = authorLikes[blog.author] + blog.likes
        } else {
            authorLikes[blog.author] = blog.likes
        }
    }

    const winner = Object.entries(authorLikes).reduce((most, current) => most[1] > current[1] ? most : current)

    const result = {
        author: winner[0],
        likes: winner[1]
    }

    return result
}   

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}