import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import "./PreviewDoc.css";
import axios from "axios";

const PreviewDoc = (props) => {
  const {
    modalShow,
    setModalShow,
    drafDocId,
    showSignDoc,
    docId,
    esignDoc,
    esigndocId,
  } = props;

  const dispatch = useDispatch();
  const { draftDocs, previewSignedDoc } = useSelector(
    (state) => state.sentDocData
  );

  const [base64, setbase64] = useState(null);

  const handleClose = () => setModalShow(false);

  useEffect(() => {
    if (drafDocId) {
      setbase64(null);
      draftDocs.map((x) => {
        if (drafDocId == x._id) {
          setbase64(x.docBase64.data);
        }
      });
    } else if (esigndocId) {
      setbase64(null);
      esignDoc.map((x) => {
        if (esigndocId == x._id) {
          if (x.signedPdfBase64 === null) {
            setbase64(x.pdfbase64);
          } else {
            setbase64(x.signedPdfBase64);
          }
        }
      });
    }
  }, [modalShow]);

  const getPreviewDoc = async (id) => {
    setbase64(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/docs/getSignedDoc/${id}`
      );
      setbase64(response.data.data.docket_Info[0].content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showSignDoc) {
      if (docId) {
        getPreviewDoc(docId);
      }
    }
  }, [docId]);

  return (
    <>
      <Modal show={modalShow} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <h3 className="m-0">
            {drafDocId ? "Preview Draft Document" : "Preview Document"}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%", height: "85vh", overflow: "hidden" }}>
            <embed
              className="pdfViewer"
              src={`data:application/pdf;base64,${base64}`}
              type="application/pdf"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PreviewDoc;
