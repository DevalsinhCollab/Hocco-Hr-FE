import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateAsset } from "../../features/dfMasterSlice";

const AssetMasterEditModal = ({ show, setShow }) => {
  const handleClose = () => setShow([false, null]);
  const [depositAmount, setDepositAmount] = useState("");
  const [shortFiled, setShortFiled] = useState("");
  const [barCode, setBarCode] = useState("");
  const [assetSerialNumber, setAssetSerialNumber] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (show && show[1]) {
      setDepositAmount(show[1].depositAmount);
      setShortFiled(show[1].shortFiled);
      setBarCode(show[1].barCode);
      setAssetSerialNumber(show[1].assetSerialNumber);
    }
  }, [show]);

  const handleSubmit = async () => {
    let finalData = {
      depositAmount,
      shortFiled,
      barCode,
      assetSerialNumber,
      id: show[1]._id,
    };

    const response = await dispatch(updateAsset(finalData));

    if (response && response.payload && response.payload.success) {
      toast("Asset successfully updated");
    }

    setShow([false, null]);
  };

  return (
    <>
      <Modal show={show[0]} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="mt-2">Deposit Amount</Form.Label>
              <Form.Control
                type="number"
                name="depositAmount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Short Filed</Form.Label>
              <Form.Control
                type="text"
                name="shortFiled"
                value={shortFiled}
                onChange={(e) => setShortFiled(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">Barcode</Form.Label>
              <Form.Control
                type="text"
                name="barCode"
                value={barCode}
                onChange={(e) => setBarCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mt-2">MFG Serial</Form.Label>
              <Form.Control
                type="text"
                name="assetSerialNumber"
                value={assetSerialNumber}
                onChange={(e) => setAssetSerialNumber(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssetMasterEditModal;
