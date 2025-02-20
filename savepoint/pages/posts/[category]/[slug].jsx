import PostComponent from "@/components/PostComponent"
import { useRouter } from "next/router"

const PostPage = () => {
    const router = useRouter()
    const { category, slug } = router.query 

    if (!category || !slug) {
        return <p>Loading...</p> 
    }

    return (
        <PostComponent title={slug} category={category} />
    )
}

export default PostPage
