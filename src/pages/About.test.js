import { render } from '@testing-library/react';
import { About } from './About';

describe('About page snapshot test', () => {
    it('will match snapshot', () => {
        let component = render(<About />);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    })
})
