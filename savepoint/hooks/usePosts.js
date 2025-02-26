import { useEffect, useState } from "react";

export default function usePosts(postsPerPage = 6, postsToLoad = 6) {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(postsPerPage); 
    const [isAllPostsVisible, setIsAllPostsVisible] = useState(false);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                if (data.length <= postsPerPage) setIsAllPostsVisible(true);
            })
            .catch(err => console.error("Error fetching posts:", err));
    }, [postsPerPage]); // Re-fetch when postsPerPage changes

    function loadMorePosts() {
        const newVisiblePosts = visiblePosts + postsToLoad;
        setVisiblePosts(newVisiblePosts);

        if (newVisiblePosts >= posts.length) setIsAllPostsVisible(true);
    }

    return { posts, visiblePosts, isAllPostsVisible, loadMorePosts };
}
