import Page from '@/components/Page'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'  // Use default import

const PostComponent = ({ title }) => {
    const [content, setContent] = useState("")
    const [metadata, setMetadata] = useState({})

    useEffect(() => {
        fetch(`/posts/${title}.md`)
            .then(res => res.text())
            .then(text => {
                const { data, content } = matter(text)  // Use the default import here
                setMetadata(data)  // Store the metadata
                setContent(content)  // Store the content
            })
            .catch(error => console.error("Error loading markdown:", error))
    }, [title])

    // Format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate() + 1
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${month}/${day}/${year}`  // You can adjust this format as needed
    }

    return (
        <Page>
            {/* Display the metadata date */}
            <p>Date: {metadata.date ? formatDate(metadata.date) : "No date available"}</p>

            <main className='postArea'>
                <img src={`/game-imgs/${title}.jpg`} alt={`${title} banner`} className='postImg' />
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </main>
        </Page>
    )
}

export default PostComponent
