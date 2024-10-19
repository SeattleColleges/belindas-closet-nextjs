import { render } from '@testing-library/react';
import Home from '../../../app/qrcode-page/page';

describe('QRCode Page component', () => {
  test('renders QR code generator with heading', () => {
    const { getByText } = render(<Home />);
    
    // - Check if the heading "QR Code Generator" is rendered -
    const heading = getByText(/QR Code Generator/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders QRCodeGenerator component', () => {
    const { container } = render(<Home />);

    // -QRCodeGenerator component is rendered by checking for the SVG presence-
    const qrCodeSvg = container.querySelector('svg');
    expect(qrCodeSvg).toBeInTheDocument();
  });
});
