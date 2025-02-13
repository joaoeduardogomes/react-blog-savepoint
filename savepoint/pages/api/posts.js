import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

export default function handler(req, res) {
    const files = fs.readdirSync(postsDirectory)

    const posts = files.map((file) => {
        const slug = file.replace(".md", "")
        const filePath = path.join(postsDirectory, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')

        const { data, content } = matter(fileContent) // Extract metadata and content using gray-matter
        
        return {
            title: data.title || slug.replace("-", " "),
            image: `/game-imgs/${slug}.jpg`,
            slug: slug,
            date: data.date || "Unknown",
            content: content
        }
    })

    // Sort posts by date if available
    posts.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (newest first)

    res.status(200).json(posts)
}
