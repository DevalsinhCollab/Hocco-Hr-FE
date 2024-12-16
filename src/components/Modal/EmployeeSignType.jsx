import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Autocomplete, LoadingButton } from "@mui/lab";
import { signTypes } from "../../constants/Employee-const";
import { TextField } from "@mui/material";
import { changeSignType } from "../../features/EmployeeDetailSlice";
import { toast } from "react-toastify";

const EmployeeSignType = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const handleClose = () => setShow([false, null]);

  const [signType, setSignType] = useState({});

  useEffect(() => {
    if (show[0]) {
      let signData = signTypes.find((item) => item.value == show[1].signType);
      setSignType(signData);
    }
  }, [show[0]]);

  const handleSubmit = async () => {
    let finalData = {
      id: show[1]._id,
      signType: signType.value,
    };
    const response = await dispatch(changeSignType(finalData));

    if (response && response.type.includes("changeSignType/fulfilled")) {
      toast.success(response.payload.message);
    }

    setShow([false, null]);
  };

  return (
    <>
      <Modal show={show[0]} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Sign Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={signTypes}
            value={signType}
            onChange={(e, newValue) => setSignType(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Sign Type" />
            )}
            sx={{ margin: "20px 0px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <LoadingButton
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

export default EmployeeSignType;
