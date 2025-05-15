import Page from "@/components/Page";
import { Button, Card } from "react-bootstrap";
import Link from "next/link"
import usePosts from "@/hooks/usePosts";

export default function Home() {

  const { posts, visiblePosts, isAllPostsVisible, loadMorePosts } = usePosts(6);

  return (
    <>
      <Page>
        <h1 className="text-center">Posts</h1>
        <div className="container d-flex flex-wrap justify-content-center gap-4 ">
          {posts.slice(0, visiblePosts).map(post => (
            <Card key={post.slug} style={{ width: '18rem' }} className="shadow-sm">
              <Card.Img variant="top" src={post.image} height={160} className="object-fit-cover" />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="fw-semiold">{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{post.date}</Card.Subtitle>
                <Link href={`/posts/${post.category}/${post.slug}`} passHref>
                  <Button variant="dark w-100">Read Post</Button>
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
    </>
  );
}
