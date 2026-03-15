import { Form } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';

function Search({ placeholder, value, onChange }) {
  return (
    <Form.Group className="mb-4 position-relative">
      <BiSearch className="search-icon" />
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </Form.Group>
  );
}

export default Search;