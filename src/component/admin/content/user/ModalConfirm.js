import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModaConfirm = (props) => {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.show} onHide={props.handleDeleteShowCloes} centered >
        <Modal.Header closeButton>
          <Modal.Title>Xóa người dùng</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Bạn có chắc chắn xóa người dùng?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleDeleteShowCloes} >Quay lại</Button>
          <Button variant="primary" onClick={props.handleDeleteConfirm}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModaConfirm;