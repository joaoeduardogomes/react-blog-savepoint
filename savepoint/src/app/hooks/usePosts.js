"use client"
import { useEffect, useState } from "react";

export default function usePosts(postsPerPage = 6, postsToLoad = 6) {
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(postsPerPage); 
    const [isAllPostsVisible, setIsAllPostsVisible] = useState(false);
    const [loading, setLoading] = useState(true); // inicia o loading

    useEffect(() => {
        setLoading(true);
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                if (data.length <= postsPerPage) setIsAllPostsVisible(true);
            })
            .catch(err => console.error("Error fetching posts:", err))
            .finally(() => setLoading(false)); // finaliza o loading
    }, [postsPerPage]);

    function loadMorePosts() {
        const newVisiblePosts = visiblePosts + postsToLoad;
        setVisiblePosts(newVisiblePosts);

        if (newVisiblePosts >= posts.length) setIsAllPostsVisible(true);
    }

    return { posts, visiblePosts, isAllPostsVisible, loadMorePosts, loading };
}
