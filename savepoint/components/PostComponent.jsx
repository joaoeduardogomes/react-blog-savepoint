import Page from '@/components/Page'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

const PostComponent = (props) => {
    const [content, setContent] = useState("")

    useEffect(() => {
        fetch(`/posts/${props.title}.md`)
            .then(res => res.text())
            .then(text => setContent(text))
            .catch(error => console.error("Error loading markdown:", error))
    }, [props.title]) // Dependency on props.title so it reloads when title changes

    let newDate = new Date()
    let day = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    return (
        <Page>
            <p>Date: {month}/{day}/{year}</p>

            <main className='postArea'>
                <img src={`/game-imgs/${props.title}.jpg`} alt={`${props.title} banner`} className='postImg' />
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </main>
        </Page>
    )
}

export default PostComponent
