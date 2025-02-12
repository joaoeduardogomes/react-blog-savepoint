import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'public', 'posts')

export default function handler(req, res) {
    const files = fs.readdirSync(postsDirectory)

    const posts = files.map((file) => {
        const filePath = path.join(postsDirectory, file)
        
        // Read the content of the Markdown file
        const fileContent = fs.readFileSync(filePath, 'utf8')

        // Use gray-matter to parse the Markdown front matter (if any) and content
        const { content } = matter(fileContent)
        
        // Extract the first line as the title (assuming it starts with an H1)
        const firstLine = content.split('\n')[0].replace("# ", "") // Remove the # from the heading
        
        const slug = file.replace(".md", "").replace(".jsx", "")
        return {
            title: firstLine || slug.replace("-", " "), // Default to slug if no H1 found
            image: `/game-imgs/${slug}.jpg`, // Assuming images are named after the slugs
            slug: slug
        }
    })

    res.status(200).json(posts)
}
