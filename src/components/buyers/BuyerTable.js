import React from "react";

import EmptyState from "../common/EmptyState";

const BuyerTable = ({
  buyers,
  onEdit,
  onDelete,
  onView,
}) => {
  if (buyers.length === 0) {
    return (
      <div className="dashboard-card">
        <EmptyState
          icon="bi-people"
          title="No buyers found"
          message="Add a buyer to start managing your customer records."
        />
      </div>
    );
  }

  return (
    <div className="dashboard-card table-card">
      <div className="card-header">
        <div>
          <h5>Buyer Records</h5>

          <p>
            {buyers.length} buyer
            {buyers.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Buyer</th>
              <th>CNIC</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {buyers.map((buyer) => (
              <tr key={buyer.id}>
                <td>
                  <div className="buyer-table-info">
                    {buyer.image ? (
                      <img
                        src={buyer.image}
                        alt={buyer.name}
                      />
                    ) : (
                      <div className="buyer-avatar">
                        {buyer.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div>
                      <strong>
                        {buyer.name}
                      </strong>

                      <small>
                        Buyer #{String(
                          buyer.id
                        ).slice(-5)}
                      </small>
                    </div>
                  </div>
                </td>

                <td>{buyer.cnic}</td>

                <td>{buyer.phone}</td>

                <td>
                  <span className="address-cell">
                    {buyer.address}
                  </span>
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      className="action-btn view"
                      onClick={() =>
                        onView(buyer)
                      }
                      title="View"
                    >
                      <i className="bi bi-eye"></i>
                    </button>

                    <button
                      className="action-btn edit"
                      onClick={() =>
                        onEdit(buyer)
                      }
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() =>
                        onDelete(buyer.id)
                      }
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerTable;