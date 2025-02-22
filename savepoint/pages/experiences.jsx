import ListPosts from "@/components/ListPosts";
import usePosts from "@/hooks/usePosts";


export default function Experiences() {

    return (
        <ListPosts pageName="Experiences" postsFilter="experiences" message="Posts about our personal experience with a game." />
    )
}