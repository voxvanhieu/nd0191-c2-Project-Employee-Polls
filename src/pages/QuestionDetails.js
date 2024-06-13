import React, { Fragment } from 'react';
import { Banner } from '../components/Banner';
import { useParams } from 'react-router-dom';
import { Container } from '../components/Container';
import { useSelector } from 'react-redux';
import { authSelectors, pollSelectors, userSelectors } from '../data/store';
import { Avatar } from '@nextui-org/react';
import { PollOption } from '../components/PollOption';

export { QuestionDetails };

function QuestionDetails() {

    const { question: pollId } = useParams();

    const currUser = useSelector(authSelectors.selectValue);
    const question = useSelector(pollSelectors.selectQuestionById(pollId));
    const author = useSelector(userSelectors.selectUserInfoById(question.author));
    const isVoted = [...question.optionOne.votes, ...question.optionTwo.votes].includes(currUser.id);

    return (
        <Container>
            <Banner text={`${author.name} @${author.id} asked you`} />

            <div className="flex flex-col justify-center items-center py-5">
                <Avatar isBordered color="success" size="lg" src={author.avatarURL} />
                <h3 className="text-3xl font-semibold mt-5 bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent uppercase">Which one would you rather?</h3>
                <p className="font-semibold text-default-400 text-small">{(new Date(question.timestamp).toLocaleString())}</p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-around">
                <div className="w-full md:w-5/12 my-5">
                    <PollOption
                        pollId={pollId}
                        option={question.optionOne}
                        canBeVoted={!isVoted}
                        name={{ full: "Option One", short: "optionOne" }} />
                </div>

                <div className="w-full md:w-5/12 my-5">
                    <PollOption
                        pollId={pollId}
                        option={question.optionTwo}
                        canBeVoted={!isVoted}
                        name={{ full: "Option Two", short: "optionTwo" }} />
                </div>
            </div>
        </Container>
    );
}