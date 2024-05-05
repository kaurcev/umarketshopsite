import React from 'react';
import '../styles/ModalAlert.css';

const ModalAlert = ({ show, onClose, text }) => {
  if (!show) return null;
  return (
    <div className='alert' onClick={onClose}>
      <span>{text}</span>
    </div>
  );
};
export default ModalAlert;