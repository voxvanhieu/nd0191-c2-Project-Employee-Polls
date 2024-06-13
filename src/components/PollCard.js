import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Listbox,
    ListboxItem,
    Avatar,
    Chip,
    Tooltip
} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { authSelectors, pollSelectors, userSelectors } from '../data/store';
import { useNavigate, generatePath } from "react-router-dom";

export { PollCard };

function PollCard({ item }) {

    const currUser = useSelector(authSelectors.selectValue);
    const question = useSelector(pollSelectors.selectQuestionById(item));
    const author = useSelector(userSelectors.selectUserInfoById(question.author));

    const isVoted = [...question.optionOne.votes, ...question.optionTwo.votes].includes(currUser.id);
    const optSelected = isVoted
        ? question.optionOne.votes.includes(currUser.id)
            ? "optionOne" : "optionTwo"
        : null;

    const navigate = useNavigate();
    const handleClick = () => navigate(
        generatePath('/questions/:question', { question: question.id })
    );

    return (
        <Card className="max-w-[340px]" isPressable onPress={handleClick}>
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src={author.avatarURL} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{author.name}</h4>
                        <h5 className="text-small tracking-tight text-default-400">@{author.id}</h5>
                    </div>
                </div>
                {
                    isVoted
                        ? <Chip color="success" variant="shadow">Voted</Chip>
                        : <Chip color="warning" variant="shadow">New</Chip>
                }
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
                <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                    <Listbox
                        ariant="faded"
                        aria-label="List poll options"
                    >
                        <ListboxItem
                            key="optionOne"
                            className={isVoted && optSelected === "optionOne" ? "text-black bg-success" : ""}
                            textValue={question.optionOne.text}
                            endContent={
                                question.optionOne.votes.length > 0
                                    ? <Chip color="secondary" variant="shadow" >{question.optionOne.votes.length}</Chip>
                                    : ""
                            }
                        >
                            <Tooltip
                                content={question.optionOne.text}
                                showArrow={true}
                                placement="top"
                                closeDelay={50}
                            >
                                {question.optionOne.text}
                            </Tooltip>
                        </ListboxItem>
                        <ListboxItem
                            key="optionTwo"
                            className={isVoted && optSelected === "optionTwo" ? "text-black bg-success" : ""}
                            textValue={question.optionTwo.text}
                            endContent={
                                question.optionTwo.votes.length > 0
                                    ? <Chip color="secondary" variant="shadow" >{question.optionTwo.votes.length}</Chip>
                                    : ""
                            }
                        >
                            <Tooltip
                                content={question.optionTwo.text}
                                showArrow={true}
                                placement="bottom"
                                closeDelay={50}
                            >
                                {question.optionTwo.text}
                            </Tooltip>
                        </ListboxItem>
                    </Listbox>
                </div>
            </CardBody>
            <CardFooter className="flex gap-3 justify-between">
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">{(new Date(question.timestamp).toLocaleString())}</p>
                </div>
                <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">{question.optionOne.votes.length + question.optionTwo.votes.length}</p>
                    <p className=" text-default-400 text-small">Following</p>
                </div>
            </CardFooter>
        </Card>
    );
}