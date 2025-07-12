const actual = jest.requireActual('react-router-dom');
 
module.exports = {
  ...actual,
  useNavigate: () => jest.fn(),
}; 