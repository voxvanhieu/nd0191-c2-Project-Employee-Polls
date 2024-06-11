import React, { Fragment } from 'react';
import { PollList } from './PollList';

export { PollGroup };

function PollGroup({ name, items }) {

    return (
        <Fragment>
            <div isBlurred
                className='relative overflow-hidden flex items-center border border-default-200 dark:border-default-100 px-2 py-4 rounded-lg bg-gradient-to-r bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center mb-5'
                shadow="sm">
                <h3 className="font-semibold text-foreground/90 w-full text-center">{name}</h3>
            </div>

            <PollList items={items} />

            <br />
        </Fragment>
    );
}