import Modal from "react-bootstrap/Modal";
import QRCode from 'qrcode.react';

const ShowQrModal = (props) => {
  const { QrmodalShow, setQrmodalShow, qrDocId, type } = props;

  const handleClose = () => setQrmodalShow(false);

  const downloadQR = () => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

  return (
    <>
    <Modal show={QrmodalShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <h3 className="m-0">QR Code</h3>
      </Modal.Header>
      <Modal.Body>

      <div style={{ width: "100%", height: "auto", overflow: "hidden", textAlign: 'center' }}>
        <QRCode 
          id="qrCode" 
          value={`${import.meta.env.VITE_FRONTEND_URL}/docqrcode/${type}/${qrDocId}`} 
          size={450} 
          includeMargin={true}
        />
      </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-white border border-1" onClick={downloadQR}>
        <i className="fa-solid fa-download text-primary fs-3 px-3"></i>
        </button>
      </Modal.Footer>
    </Modal>
    </>
    
  );
};

export default ShowQrModal;
