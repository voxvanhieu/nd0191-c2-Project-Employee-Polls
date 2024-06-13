
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, pollActions } from '../data/store';
import { useNavigate } from 'react-router-dom';

export { PollOption };

function PollOption({ pollId, name, option, canBeVoted }) {

    const dispatch = useDispatch();
    const auth = useSelector(authSelectors.selectValue);
    const navigate = useNavigate();

    const handleClick = (event) => {
        dispatch(pollActions.storeAnswer({
            userId: auth.id,
            questionId: pollId,
            answer: name.short
        })).finally(() => navigate("/"));
    }

    return (
        <Card fullWidth isPressable onPress={canBeVoted ? handleClick : null}>
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
                <div className="flex flex-col items-start">
                    <p className="text-md">{name.full}</p>
                    <p className="text-small italic text-default-500">{canBeVoted ? "Click this card to vote." : "Already voted this poll."}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{option.text}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <p className="text-default-500 italic">Total <Chip color="secondary" variant="shadow" size="sm">{option.votes.length}</Chip> votes(s).</p>
            </CardFooter>
        </Card>
    );
}