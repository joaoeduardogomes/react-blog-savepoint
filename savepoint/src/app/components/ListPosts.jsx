"use client"
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import Page from "./Page";
import usePosts from "../hooks/usePosts";
import Loading from "../loading";

export default function ListPosts({pageName = "erro", postsFilter = "", query = "", message=""}) {

    const { posts, visiblePosts, isAllPostsVisible, loadMorePosts, loading } = usePosts(10, 10);

    const normalizedQuery = query ? query.replace(/['\u2019]/g, '') : '';
    const regex = normalizedQuery ? new RegExp(normalizedQuery, 'i') : null;

    if (loading) {
        return <Loading />;
    }

    return (
        <Page>
            <h1 className="mb-3 text-center">{pageName}</h1>
            <p className="mb-5 text-center">{message}</p>

            <div className="container d-flex flex-wrap justify-content-center gap-4">
                {posts
                    .filter(post => {
                        if (!query) {
                            return post.category === postsFilter;
                        }
    
                        const normalizedTags = post.tags.map(tag => tag.replace(/['\u2019]/g, ''));
                        return (post.category === postsFilter || normalizedTags.some(tag => regex.test(tag)));
                    })
                    .slice(0, visiblePosts)
                    .map(post => (
                        <Card key={post.slug}
                            className="list-card d-flex flex-row shadow-sm"
                        >
                            <Card.Img variant="top" src={post.image} className="w-50"/>
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Card.Title className="fw-bold">{post.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
                                <Link href={`/posts/${post.category}/${post.slug}`} passHref>
                                    <Button variant="dark w-100" className="link">
                                        Read Post
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
            </div>

            {!isAllPostsVisible && (
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="warning" onClick={loadMorePosts}>
                        Load More
                    </Button>
                </div>
            )}
        </Page>
    )
}