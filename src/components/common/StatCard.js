const StatCard = ({
  title,
  value,
  icon,
  trend,
  iconClass = "",
}) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconClass}`}>
        <i className={`bi ${icon}`}></i>
      </div>

      <div className="stat-content">
        <p>{title}</p>
        <h3>{value}</h3>

        {trend && (
          <small>
            <i className="bi bi-arrow-up"></i>{" "}
            {trend}
          </small>
        )}
      </div>
    </div>
  );
};

export default StatCard;