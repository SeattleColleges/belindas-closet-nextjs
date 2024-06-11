import { render } from '@testing-library/react';
import MissionPage from '../../../app/mission-page/page';

describe('MissionPage component', () => {
  test('renders mission page', () => {
    const { getByText } = render(<MissionPage />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const missionHeader = getByText('Our Mission');
    expect(missionHeader).toBeInTheDocument();
    // Add more assertions as needed
  });
});
