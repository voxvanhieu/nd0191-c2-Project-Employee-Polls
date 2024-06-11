
import React from "react";
import { PollGroup } from "../components";

export { Dashboard }

function Dashboard() {

    const items = [
        {
            name: 'hieu'
        },
        {
            name: 'hieuueuu'
        },
        {
            name: 'ashdhasd'
        },
        {
            name: 'dfsgsdfg'
        },
        {
            name: 'sdgfdsfg'
        }
    ];

    return (
        <div className="container mx-auto min-h-svh my-8">
            <PollGroup
                name="New Questions"
                items={items} />
        </div>
    );
}