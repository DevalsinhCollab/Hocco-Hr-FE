import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { getAllVrs, updateVrs } from "../../features/VrsSlice";

const VrsEditModal = ({
  show,
  setShow,
  callApi
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.vrsData);
  const handleClose = () => setShow([false, null]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhar, setAdhar] = useState("");
  const [birth, setBirth] = useState("");

  useEffect(() => {
    if (show && show[1]) {
      setName(show[1].name);
      setEmail(show[1].email);
      setPhone(show[1].phone);
      setAdhar(show[1].adhar);
      setBirth(show[1].birth);
    }
  }, [show]);

  const handleSubmit = async () => {
    let finalData = {
      id: show[1]._id,
      name,
      email,
      phone,
      adhar,
      birth,
    };

    const response = await dispatch(updateVrs(finalData));

    if (response && response.payload && response.payload.success) {
      toast("Vrs successfully updated");
    }

    callApi()

    setShow([false, null]);
  };

  return (
    <>
      <Modal show={show[0]} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vrs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="mt-2">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Adhar</Form.Label>
              <Form.Control
                type="number"
                name="adhar"
                value={adhar}
                onChange={(e) => setAdhar(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Birth Year</Form.Label>
              <Form.Control
                type="number"
                name="birth"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit}
          >
            Save Changes
          </LoadingButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VrsEditModal;
