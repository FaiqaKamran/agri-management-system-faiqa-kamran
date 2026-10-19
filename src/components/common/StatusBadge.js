const StatusBadge = ({ status }) => {
  const getClass = () => {
    switch (status) {
      case "Healthy":
      case "Delivered":
        return "status-success";

      case "Needs Attention":
      case "Pending":
        return "status-warning";

      case "Critical":
      case "Cancelled":
        return "status-danger";

      default:
        return "status-neutral";
    }
  };

  return (
    <span className={`status-badge ${getClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;