import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../features/customerDetailSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const CustomerEditModal = ({ show, setShow }) => {
  const handleClose = () => setShow([false, null]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customerData);
  const [custName, setCustName] = useState("");
  const [custEmailID, setCustEmailID] = useState("");
  const [adhar, setAdhar] = useState("");
  const [contactPersonMobile, setContactPersonMobile] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (show && show[1]) {
      setCustName(show[1].custName);
      setCustEmailID(show[1].custEmailID);
      setAdhar(show[1].adhar);
      setContactPersonMobile(show[1].contactPersonMobile);
      setGender(show[1].gender);
    }
  }, [show]);

  const handleSubmit = async () => {
    let finalData = {
      custName,
      custEmailID,
      adhar,
      contactPersonMobile,
      id: show[1]._id,
      gender,
    };

    const response = await dispatch(updateCustomer(finalData));

    if (response && response.payload && response.payload.success) {
      toast("Customer successfully updated");
    }

    setShow([false, null]);
  };

  const handleRadioChange = (e) => {
    setGender(e.target.value);
  };
  return (
    <>
      <Modal show={show[0]} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="mt-2">Name</Form.Label>
              <Form.Control
                type="text"
                name="custName"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-2">Email</Form.Label>
              <Form.Control
                type="email"
                name="custEmailID"
                value={custEmailID}
                onChange={(e) => setCustEmailID(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Aadhar</Form.Label>
              <Form.Control
                type="number"
                name="adhar"
                value={adhar}
                onChange={(e) => setAdhar(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Phone Number</Form.Label>
              <Form.Control
                type="number"
                name="contactPersonMobile"
                value={contactPersonMobile}
                onChange={(e) => setContactPersonMobile(e.target.value)}
              />
            </Form.Group>

            <div className="mt-3 d-flex gap-3">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="me-1"
                  checked={["male"].includes(gender.toLowerCase())}
                  onChange={handleRadioChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="me-1"
                  checked={["female"].includes(gender.toLowerCase())}
                  onChange={handleRadioChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="me-1"
                  checked={["other"].includes(gender.toLowerCase())}
                  onChange={handleRadioChange}
                />
                Other
              </label>
            </div>
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

export default CustomerEditModal;
