import React, { Fragment } from 'react';
import { Banner } from '../components/Banner';
import { useParams } from 'react-router-dom';
import { Container } from '../components/Container';
import { useSelector } from 'react-redux';
import { pollSelectors, userSelectors } from '../data/store';
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from '@nextui-org/react';

export { QuestionDetails };

function QuestionDetails() {

    const { question: pollId } = useParams();
    const question = useSelector(pollSelectors.selectQuestionById(pollId));
    const author = useSelector(userSelectors.selectUserInfoById(question.author));

    return (
        <Container>
            <Banner text={`${author.name} @${author.id} asked you`} />
            <div className="flex flex-col justify-center items-center py-5">
                <Avatar isBordered color="success" size="lg" src={author.avatarURL} />
                <h3 className="text-3xl font-semibold mt-5 bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent uppercase">Which one would you rather?</h3>
            </div>

            <div className="option-wrapper flex flex-col md:flex-row md:justify-around">
                <div className="w-full md:w-5/12 my-5">
                    <Card fullWidth isPressable>
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col items-start">
                                <p className="text-md">Option One</p>
                                <p className="text-small italic text-default-500">Click this card to vote.</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{question.optionOne.text}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <p className="text-default-500 italic">Total <Chip color="secondary" variant="shadow" size="sm">{question.optionOne.votes.length}</Chip> votes(s).</p>
                        </CardFooter>
                    </Card>
                </div>

                <div className="w-full md:w-5/12 my-5">
                    <Card fullWidth isPressable>
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col items-start">
                                <p className="text-md">Option Two</p>
                                <p className="text-small italic text-default-500">Click this card to vote.</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{question.optionTwo.text}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <p className="text-default-500 italic">Total <Chip color="secondary" variant="shadow" size="sm">{question.optionTwo.votes.length}</Chip> votes(s).</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Container>
    );
}