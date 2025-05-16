// app/api/posts/route.js

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

function getPostsFromDirectory(directory, category = "") {
    const files = fs.readdirSync(directory)
    let posts = []

    files.forEach((file) => {
        const filePath = path.join(directory, file)
        const isDirectory = fs.statSync(filePath).isDirectory()

        if (isDirectory) {
            const nestedPosts = getPostsFromDirectory(filePath, file)
            posts = [...posts, ...nestedPosts]
        } else if (file.endsWith('.md')) {
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            const { data } = matter(fileContent)
            const slug = file.replace('.md', '')

            posts.push({
                title: data.title || slug.replace("-", " "),
                date: data.date || "Unknown Date",
                tags: data.tags || [],
                image: `/game-imgs/${data.img || 'default.jpg'}`,
                slug,
                category
            })
        }
    })

    return posts
}

export async function GET() {
    const posts = getPostsFromDirectory(postsDirectory)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    return Response.json(posts)
}
