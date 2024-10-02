import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
const ModaNotifi = (props) => {
  let history = useNavigate();
  const handleClick = ()=>{
      history("/login");
  }
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.show} onHide={props.setShow} backdrop ="static" centered >
        <Modal.Header >
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Bạn cần đăng nhập để sử dụng dịch vụ</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>handleClick()}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModaNotifi;