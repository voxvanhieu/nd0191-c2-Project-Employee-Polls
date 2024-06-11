import React from 'react';
import { PollCard } from './PollCard';

export { PollList };

function PollList({ items }) {

    return (
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
                <PollCard item={item} />
            ))}
        </div>
    );
}