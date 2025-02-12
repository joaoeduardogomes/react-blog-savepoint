import PostComponent from "@/components/PostComponent"
import { useRouter } from "next/router"

const PostPage = () => {
    const router = useRouter()
    const { id } = router.query // This will get the `id` from the URL

    if (!id) {
        return <p>Loading...</p> // Handle case when `id` is not yet available (loading state)
    }

    return (
        <PostComponent title={id} />
    )
}

export default PostPage
