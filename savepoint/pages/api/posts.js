import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

function getPostsFromDirectory(directory, category="") {
    const files = fs.readdirSync(directory)
    let posts = []

    files.forEach((file) => {
        const filePath = path.join(directory, file)
        const isDirectory = fs.statSync(filePath).isDirectory()

        if (isDirectory) {
            // gets all posts from subdirectories
            const nestedPosts = getPostsFromDirectory(filePath, file)
            posts = [...posts, ...nestedPosts]
        }
        else if (file.endsWith('.md')) {
            // extracts metadata and content from a .md file
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            const { data } = matter(fileContent)
            const slug = file.replace('.md', '')

            posts.push({
                title: data.title || slug.replace("-", " "),
                date: data.date || "Unknown Date",
                tags: data.tags || [],
                image: `/game-imgs/${data.img}`,
                slug: slug,
                category: category
            })
        }
    })

    return posts
}

export default function handler(req, res) {
    const posts = getPostsFromDirectory(postsDirectory)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    res.status(200).json(posts)
}
