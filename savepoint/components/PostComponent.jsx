import Page from '@/components/Page'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Link from 'next/link'

const PostComponent = ({ title, image, category }) => {
    const [content, setContent] = useState("")
    const [metadata, setMetadata] = useState({})

    useEffect(() => {
        fetch(`/posts/${category}/${title}.md`)
            .then(res => res.text())
            .then(text => {
                const { data, content } = matter(text)
                setMetadata(data)
                setContent(content)
            })
            .catch(error => console.error("Error loading markdown:", error))
    }, [category, title])

    // Format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate() + 1
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
    }

    return (
        <Page>
            <p>Date: {metadata.date ? formatDate(metadata.date) : "No date available"}</p>
            <p>
                Tags:{" "}
                {metadata.tags && metadata.tags.length > 0 ? (
                    metadata.tags.map((tag, index) => (
                        <>
                            <Link href={`/q=${encodeURIComponent(tag)}`} passHref className='text-decoration-none fw-semibold'>
                                {tag}
                            </Link>
                            {index < metadata.tags.length - 1 && ", "}
                        </>
                    ))
                ) : (
                    "No tags available"
                )}
            </p>

            <article className='postArea '>
                <img src={`/game-imgs/${metadata.img}`} alt={`${title} banner`} className='postImg' />
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </article>
        </Page>
    )
}


export default PostComponent
