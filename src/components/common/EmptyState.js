const EmptyState = ({
  icon = "bi-inbox",
  title = "No data found",
  message = "There is nothing to display.",
}) => {
  return (
    <div className="empty-state">
      <i className={`bi ${icon}`}></i>

      <h6>{title}</h6>

      <p>{message}</p>
    </div>
  );
};

export default EmptyState;