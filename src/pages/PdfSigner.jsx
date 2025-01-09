import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import signatureImage from "./signature.png"; // Your signature image file

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

const PDFSigner = () => {
  const [file, setFile] = useState(null); // Stores the selected PDF file
  const [numPages, setNumPages] = useState(null); // Total pages in the PDF
  const [signaturePosition, setSignaturePosition] = useState(null); // Position of the signature
  const [dragging, setDragging] = useState(false); // Is the signature being dragged?

  const pdfContainerRef = useRef(null);

  // Handle file selection
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setFile(fileURL);
      setSignaturePosition(null); // Reset signature position on new file
    }
  };

  // PDF successfully loaded
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handle dragging start
  const handleMouseDown = (e) => {
    if (signaturePosition) {
      const rect = pdfContainerRef.current.getBoundingClientRect();
      const { x, y } = signaturePosition;

      const withinSignature =
        e.clientX >= rect.left + x &&
        e.clientX <= rect.left + x + 100 && // Signature width (adjust as needed)
        e.clientY >= rect.top + y &&
        e.clientY <= rect.top + y + 50; // Signature height (adjust as needed)

      if (withinSignature) {
        setDragging(true);
      }
    }
  };

  // Handle dragging
  const handleMouseMove = (e) => {
    if (dragging) {
      const container = pdfContainerRef.current.getBoundingClientRect();
      setSignaturePosition({
        x: e.clientX - container.left - 50, // Center the signature horizontally
        y: e.clientY - container.top - 25, // Center the signature vertically
      });
    }
  };

  // Stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ userSelect: "none", padding: "20px" }}
    >
      <h1>PDF Signer</h1>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <div
        ref={pdfContainerRef}
        style={{
          position: "relative",
          border: "1px solid black",
          marginTop: "20px",
          padding: "10px",
          cursor: dragging ? "grabbing" : "default",
        }}
        onMouseDown={handleMouseDown}
      >
        {file && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error loading PDF:", error)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={index} pageNumber={index + 1} />
            ))}
          </Document>
        )}
        
        {signaturePosition && (
          <img
            src={signatureImage}
            alt="Signature"
            style={{
              position: "absolute",
              top: signaturePosition.y,
              left: signaturePosition.x,
              width: "100px",
              height: "50px",
              cursor: "grab",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PDFSigner;