import Page from "@/components/Page";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Link from "next/link"

export default function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error fetching posts:", err))
  }, [])

  return (
    <>
      <Page>
        <h1>Posts</h1>
        <div className="d-flex flex-wrap gap-3">
          {posts.map(post => (
            <Card key={post.slug} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={post.image} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
                <Link href={`/posts/${post.slug}`} passHref>
                  <Button variant="primary">Read Post</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Page>
    </>
  );
}
