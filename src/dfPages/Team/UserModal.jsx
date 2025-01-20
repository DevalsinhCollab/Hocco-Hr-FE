import { useEffect, useState } from "react";
import { crateuser, updateuser } from "../../features/userDetailsSlice";
import { Modal, Button } from "react-bootstrap";
import "./css/table.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function UserModal(props) {
  const { showModal, setShowModal, showEditModal, setShowEditModal, users } =
    props;

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    designation: "",
    empImgBase64: "",
  });
  const [visible, setVisible] = useState(false);

  const handlePhoneChange = (value, country) => {
    setUser((prevUser) => ({
      ...prevUser,
      phone: value,
    }));
  };

  const _handleOnChnage = (e) => {
    setUser((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const _handleOnChnageImg = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setUser((data) => ({
        ...data,
        empImgBase64: base64Data,
      }));
    };
    reader.readAsDataURL(file);
  };

  const _handleSubmit = async (e) => {
    if (!user.name) {
      return toast("Please enter your name");
    } else if (!/^([a-zA-Z ]){2,30}$/.test(user.name)) {
      return toast(
        "Please enter valid name ( you can't use digital or spacial character )"
      );
    }
    if (!user.email) {
      return toast("Please enter your email");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      return toast("Please enter valid email");
    }
    if (!user.phone) {
      return toast("Please enter your phone");
    } else if (user.phone.length < 11) {
      return toast("Please enter valid phone");
    }
    if (!user.password) {
      return toast("Please enter your password");
    } else if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
        user.password
      )
    ) {
      return toast(
        "Your password must be at least 8 charactersd and at least one letter and one digit"
      );
    }
    if (!user.designation) {
      return toast("Add designation");
    }

    const getData = await dispatch(crateuser({ user }));
    if (getData.type.includes("fulfilled")) {
      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        designation: "",
        empImgBase64: "",
      });
      setShowModal(false);
      toast("Member created successfully");
    } else {
      toast(getData.payload.message);
    }
  };

  const _handleEditSubmit = async () => {
    if (!user.name) {
      return toast("Please enter your name");
    } else if (!/^([a-zA-Z ]){2,30}$/.test(user.name)) {
      return toast(
        "Please enter valid name ( you can't use digital or spacial character )"
      );
    }
    if (!user.email) {
      return toast("Please enter your email");
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      return toast("Please enter valid email");
    }
    if (!user.phone) {
      return toast("Please enter your phone");
    } else if (user.phone.length < 11) {
      return toast("Please enter valid phone");
    }

    const updateuserData = await dispatch(updateuser(user));
    if (updateuserData.type.includes("fulfilled")) {
      setUser({
        name: "",
        email: "",
        phone: "",
      });
      setShowEditModal(false);
      toast("Member updated successfully");
    } else {
      alert(getData.payload.message);
    }
  };

  useEffect(() => {
    if (showEditModal[1]) {
      const data = users.filter((ele) => ele._id === showEditModal[1]);
      setUser(data[0]);
    }
  }, [showEditModal]);

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="mb-1 ms-1">Name</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            name="name"
            onChange={_handleOnChnage}
          />
          <label className="mb-1 ms-1">Email</label>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            name="email"
            onChange={_handleOnChnage}
          />
          <label className="mb-1 ms-1">Phone</label>
          <PhoneInput
            inputStyle={{
              width: "100%",
              border: "none",
              padding: "2px 50px",
            }}
            country={"in"}
            enableSearch={true}
            className="emailInput form-control"
            value={user.phone}
            onChange={handlePhoneChange}
            rules={{ required: true }}
            // required
          />
          <label className="mb-1 ms-1">Password</label>
          <div className="d-flex align-items-center">
            <input
              type={visible ? "text" : "password"}
              className="form-control mb-2"
              placeholder="Password"
              name="password"
              onChange={_handleOnChnage}
            />
            <button
              className="teamshow_pass border"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {visible ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>
          <label className="mb-1 ms-1">Designation</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Designation"
            name="designation"
            onChange={_handleOnChnage}
          />
          <label className="mb-1 ms-1">Upload image</label>
          <input
            type="file"
            id="file"
            className="form-control mb-2"
            name="img"
            accept="image/jpeg, image/png, image/gif"
            onChange={_handleOnChnageImg}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={_handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal[0]} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={_handleOnChnage}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={_handleOnChnage}
          />
          <input
            type="tel"
            className="form-control mb-2"
            placeholder="Phone"
            name="phone"
            value={user.phone}
            onChange={_handleOnChnage}
          />
          <input
            type="file"
            className="form-control mb-2"
            placeholder="Phone"
            name="phone"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={_handleEditSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
