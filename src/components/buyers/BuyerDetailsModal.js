const BuyerDetailsModal = ({
  buyer,
  crops,
  onClose,
}) => {
  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal buyer-details-modal">
        <div className="modal-header-custom">
          <div>
            <h5>Buyer Details</h5>
            <p>Complete buyer information</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="buyer-profile">
          {buyer.image ? (
            <img
              src={buyer.image}
              alt={buyer.name}
            />
          ) : (
            <div className="buyer-profile-placeholder">
              {buyer.name
                ?.charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div>
            <h4>{buyer.name}</h4>
            <span>Registered Buyer</span>
          </div>
        </div>

        <div className="buyer-detail-grid">
          <div>
            <span>CNIC</span>
            <strong>{buyer.cnic}</strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>{buyer.phone}</strong>
          </div>

          <div className="full">
            <span>Address</span>
            <strong>{buyer.address}</strong>
          </div>

          <div className="full">
            <span>Available Crops</span>
            <strong>
              {crops.length} registered crops
            </strong>
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="btn btn-light"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDetailsModal;