
import React from "react";
import { PollGroup } from "../components";
import { useSelector } from "react-redux";
import { authSelectors, pollSelectors, userSelectors } from "../data/store";
import { Container } from "../components/Container";
import { Tab, Tabs } from "@nextui-org/react";

export { Dashboard }

function Dashboard() {
    const currUser = useSelector(authSelectors.selectValue);
    const allPolls = useSelector(pollSelectors.selectValue);

    const allPollsObj = Object.values(allPolls).sort((a, b) => b.timestamp - a.timestamp);
    const donePollIds = allPollsObj
        .filter((item, index) => [...item.optionOne.votes, ...item.optionTwo.votes].includes(currUser.id))
        .map((item) => item.id);

    const newPollIds = allPollsObj
        .filter((item, index) => !donePollIds.includes(item.id))
        .map((item) => item.id);

    return (
        <Container>
            <Tabs aria-label="Options">
                <Tab key="new-questions" title="New Questions">
                    <PollGroup
                        name="New Questions"
                        items={newPollIds} />
                </Tab>
                <Tab key="done-questions" title="Completed">
                    <PollGroup
                        name="Completed"
                        items={donePollIds} />
                </Tab>
            </Tabs>

        </Container>
    );
}