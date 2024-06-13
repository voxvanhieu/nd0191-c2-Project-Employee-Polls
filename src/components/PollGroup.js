import React, { Fragment } from 'react';
import { Banner } from './Banner';
import { PollList } from './PollList';

export { PollGroup };

function PollGroup({ name, items }) {

    return (
        <Fragment>

            <Banner text={name} />

            <PollList items={items} />

            <br />
        </Fragment>
    );
}