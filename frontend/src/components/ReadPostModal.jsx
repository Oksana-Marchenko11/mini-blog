import { Modal, Button } from "react-bootstrap";

export const ReadPostModal = ({ show, onHide, post }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Читати пост цілком</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Заголовок</h5>
        <p>{post.title}</p>
        <h5>Текст</h5>
        <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
