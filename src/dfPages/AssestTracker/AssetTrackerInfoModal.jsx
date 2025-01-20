import React, { useEffect, useState } from "react";
import "./table.css";
import { Modal, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAssetsBySerialNumber } from "../../features/AssetTrackerSlice";
import CancelIcon from '@mui/icons-material/Cancel';

export default function AssetTrackerInfoModal(props) {
  const { showModal, setShowModal, popupData } = props;
  const dispatch = useDispatch();

  const [assestData, setAssestData] = useState([]);

  const callApi = async () => {
    let response = await dispatch(
      getAssetsBySerialNumber({
        assetSerialNumber: popupData.assetSerialNumber,
      })
    );

    if (response && response.payload && response.payload.data) {
      setAssestData(response.payload.data);
    }
  };

  useEffect(() => {
    if (showModal) {
      callApi();
    }
  }, [showModal]);

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            background: "#ce1042",
            color: "#fff"
          }}
        >
          <Modal.Title>Asset Info</Modal.Title>
          <Modal.Title onClick={() => setShowModal(false)} style={{ cursor: "pointer" }}><CancelIcon /></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Customer Code</th>
                <th>Customer Name</th>
                <th>Asset Sr. No.</th>
                <th>Status</th>
                <th>Bar Code</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {assestData &&
                assestData.map((item) => {
                  return (
                    <tr>
                      <td>{item?.custCode}</td>
                      <td>
                        {item?.custCode !== "Depo" ? item?.custName : "Depo"}
                      </td>
                      <td>{item?.assetSerialNumber}</td>
                      <td>{item?.status}</td>
                      <td>{item?.barCode}</td>
                      <td>{item?.createdAt}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}
