
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, pollActions, userActions } from '../data/store';
import { useNavigate } from 'react-router-dom';
import { divideRound2 } from '../helpers';

export { PollOption };

function PollOption({ pollId, name, option, canBeVoted, isHighlight, totalVoted }) {

    const dispatch = useDispatch();
    const auth = useSelector(authSelectors.selectValue);
    const navigate = useNavigate();

    const handleClick = (event) => {
        const answerObj = {
            userId: auth.id,
            questionId: pollId,
            answer: name.short
        }

        dispatch(pollActions.storeAnswer(answerObj))
            .then(() => {
                dispatch(userActions.getUsers());
            })
            .finally(() => navigate("/"));
    }

    return (
        <Card fullWidth isPressable onPress={canBeVoted ? handleClick : null}>
            <CardHeader className="flex gap-3 justify-between">
                <div className="flex flex-col items-start">
                    <p className="text-md">{name.full}</p>
                    <p className="text-small italic text-default-500">{canBeVoted ? "Click this card to vote." : "Already voted this poll."}</p>
                </div>

                {isHighlight
                    ? <Chip color="success" variant="shadow">You Voted</Chip>
                    : null}
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{option.text}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="w-full flex flex-row justify-between">
                    <div className="text-default-500 italic"><Chip color="secondary" variant="shadow" size="sm">{totalVoted ? divideRound2(option.votes.length, totalVoted) * 100 : 0}%</Chip></div>
                    <div className="text-default-500 italic">Total <Chip color="secondary" variant="shadow" size="sm">{option.votes.length}</Chip> votes(s)</div>
                </div>
            </CardFooter>
        </Card>
    );
}