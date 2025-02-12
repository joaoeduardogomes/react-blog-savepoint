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
            title: data.title || slug.replace("-", " "), // Use the title from the front matter or fallback to the slug
            image: `/game-imgs/${slug}.jpg`, // Assuming images are named after the slug
            slug: slug,
            date: data.date || "Unknown", // Add the date from front matter
            content: content // Store the content of the post (if you want to display it elsewhere)
        }
    })

    // Sort posts by date if available
    posts.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (newest first)

    res.status(200).json(posts)
}
