import React from 'react';
import { render, screen } from '@testing-library/react';
import { Banner } from './Banner';

describe('About page snapshot test', () => {
    it('will match snapshot', () => {
        const testText = "This is a sample text for testing";
        const component = render(
            <Banner text={testText} />
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();

        const lblBanner = screen.getByTestId("lblBanner");
        expect(lblBanner.textContent).toBe(testText);
    })
})
