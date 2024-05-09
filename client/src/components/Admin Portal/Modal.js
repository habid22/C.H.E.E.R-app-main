import React from 'react';
import './Modal.css'; // You should create a corresponding CSS file for modal styles

const Modal = ({ show, onClose, reports }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">User Reports</h4>
        </div>
        <div className="modal-body">
          <table className="modal-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Reporter Username</th>
                <th>Reported User</th>
                <th>Reason</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.reporterUsername}</td>
                  <td>{report.reportedUser}</td>
                  <td>{report.reason}</td>
                  <td>{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
