"use client"

import PostComponent from "@/app/components/PostComponent"
import { use } from "react"

export default function PostPage(props) {
    const { category, slug } = use(props.params)

    return (
        <PostComponent title={slug} category={category} />
    )
}
