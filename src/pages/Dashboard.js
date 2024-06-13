
import React from "react";
import { PollGroup } from "../components";
import { useSelector } from "react-redux";
import { authSelectors, pollSelectors, userSelectors } from "../data/store";
import { Container } from "../components/Container";

export { Dashboard }

function Dashboard() {
    const currUser = useSelector(authSelectors.selectValue);
    const allPolls = useSelector(pollSelectors.selectValue);

    const donePollIds = Object.values(allPolls)
        .filter((item, index) => [...item.optionOne.votes, ...item.optionTwo.votes].includes(currUser.id))
        .map((item) => item.id);

    const newPollIds = Object.keys(allPolls)
        .filter((item, index) => !donePollIds.includes(item));

    return (
        <Container>
            <PollGroup
                name="New Questions"
                items={newPollIds} />

            <br />
            <br />

            <PollGroup
                name="Completed"
                items={donePollIds} />
        </Container>
    );
}