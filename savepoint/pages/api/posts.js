import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

export default function handler(req, res) {
    const files = fs.readdirSync(postsDirectory)

    const posts = files.map((file) => {
        const filePath = path.join(postsDirectory, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(fileContent) // Extract metadata

        return {
            title: data.title || file.replace(".md", "").replace("-", " "), 
            date: data.date || "Unknown Date",
            tags: data.tags || [],
            image: `/game-imgs/${file.replace(".md", "")}.jpg`,
            slug: file.replace(".md", "").replace("&", "")
        }
    })

    res.status(200).json(posts)
}
