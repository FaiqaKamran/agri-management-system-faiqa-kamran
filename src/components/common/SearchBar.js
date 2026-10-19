const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="search-box">
      <i className="bi bi-search"></i>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;