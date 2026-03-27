function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="ค้นหาสินค้า..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;