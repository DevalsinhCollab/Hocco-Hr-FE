import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBase64,
  getAgreementByAssetId,
} from "../../features/AssetTrackerSlice";

export default function ViewPDF(props) {
  const { showModal, setShowModal, setCheckPdf } = props;

  const dispatch = useDispatch();

  const { allAgreements } = useSelector((state) => state.assetTrackerData);

  const [base64, setBase64] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (showModal[0]) {
          let response = await dispatch(
            getAgreementByAssetId({ id: showModal[1] })
          );

          let docketAndDocumentId =
            response && response.payload && response.payload.data;

          if (docketAndDocumentId.signStatus !== "S") {
            let finalData = {
              docketId: docketAndDocumentId.res_docket_id,
              documentId: docketAndDocumentId.res_document_id,
            };

            const changeBase64Data = await dispatch(changeBase64(finalData));

            if (
              changeBase64Data &&
              changeBase64Data.payload &&
              changeBase64Data.payload.success
            ) {
              setBase64(changeBase64Data.payload.data.documentBase64.Location);
            }
          } else {
            if (docketAndDocumentId.documentBase64) {
              setBase64(docketAndDocumentId.documentBase64);
            } else {
              setBase64(null);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showModal]);

  return (
    <>
      <Modal
        show={showModal[0]}
        onHide={() => setShowModal([false, null])}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>View PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed style={{ width: "100%", height: "40rem" }} src={base64} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal([false, null])}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
