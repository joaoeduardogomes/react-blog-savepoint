import Page from "@/components/Page";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Link from "next/link"

export default function Home() {

  const [posts, setPosts] = useState([])
  const [visiblePosts, setVisiblePosts] = useState(8)
  const [isAllPostsVisible, setIsAllPostsVisible] = useState(false)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        if (data.length <= 8) setIsAllPostsVisible(true)
      })
      .catch(err => console.error("Error fetching posts:", err))
  }, [])

  function loadMorePosts() {
    const newVisiblePosts = visiblePosts + 4
    setVisiblePosts(newVisiblePosts)

    if (newVisiblePosts >= posts.length) setIsAllPostsVisible(true)
  }

  return (
    <>
      <Page>
        <h1 className="text-center">Posts</h1>
        <div className="container d-flex flex-wrap justify-content-center gap-4">
          {posts.slice(0, visiblePosts).map(post => (
            <Card key={post.slug} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={post.image} height={160} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
                <Link href={`/posts/${post.category}/${post.slug}`} passHref>
                  <Button variant="primary w-100">Read Post</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>

        {!isAllPostsVisible && (
          <div className="d-flex justify-content-center mt-3">
          <Button variant="dark" onClick={loadMorePosts}>
            Load More
          </Button>
        </div>
        )}
      </Page>
    </>
  );
}
