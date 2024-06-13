import React from 'react';
import { PollCard } from './PollCard';

export { PollList };

function PollList({ items }) {

    if (!items || items.length == 0) {
        return (
            <div className="w-full text-center">
                <h3>No data</h3>
            </div>
        );
    }

    return (
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
            {
                items.map((id, index) => <PollCard key={id} item={id} />)
            }
        </div>
    );
}