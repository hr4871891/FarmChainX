import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeModal.css';

const QRCodeModal = ({ crop, onClose }) => {
  // This function stops the modal from closing if you click inside the content area
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <div className="modal-header">
          <h3>QR Code for {crop.name}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <QRCodeSVG
            value={crop.barcode || 'No data'} // The value to encode in the QR code
            size={256} // The size of the QR code
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"} // Error correction level
            includeMargin={true}
          />
          <p className="qr-value">{crop.barcode}</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;