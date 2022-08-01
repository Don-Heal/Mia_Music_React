import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders About information', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Mia Music Studios/i);
  expect(linkElement).toBeInTheDocument();
});
