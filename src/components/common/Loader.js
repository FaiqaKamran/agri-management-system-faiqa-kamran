const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div
        className="spinner-border"
        role="status"
      ></div>

      <span>{text}</span>
    </div>
  );
};

export default Loader;