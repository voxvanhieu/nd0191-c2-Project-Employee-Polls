
import React from "react";
import { PollGroup } from "../components";
import { useSelector } from "react-redux";
import { authSelectors, pollSelectors, userSelectors } from "../data/store";
import { Container } from "../components/Container";

export { Dashboard }

function Dashboard() {
    const currUser = useSelector(authSelectors.selectValue);
    const currUserVotedPolls = useSelector(userSelectors.selectCompletedPolls(currUser.id)) ?? {};
    const currUserVotedPollIds = Object.keys(currUserVotedPolls);

    const newPollIds = useSelector(pollSelectors.selectQuestionIdsExcepts(currUserVotedPollIds));
    const donePollIds = useSelector(pollSelectors.selectQuestionIds(currUserVotedPollIds));

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