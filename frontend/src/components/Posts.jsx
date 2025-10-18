import { Row, Col, Card, Button } from "react-bootstrap";

export const Posts = ({ posts, onDelete }) => {
  console.log(posts);
  return (
    <>
      {posts.length === 0 && <p>Пости відсутні</p>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post._id}>
            <Card style={{ marginBottom: 12 }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <small>
                  Створено: {new Date(post.createdAt).toLocaleString()}
                </small>
                <br />
                <Button
                  variant="danger"
                  onClick={() => onDelete(post._id)}
                  style={{ marginTop: 6 }}
                >
                  Видалити
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
