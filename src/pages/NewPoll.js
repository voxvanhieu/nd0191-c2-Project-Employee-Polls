import React, { Fragment, useState } from 'react';
import { Banner } from '../components/Banner';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, pollActions, pollSelectors, userSelectors } from '../data/store';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Textarea } from '@nextui-org/react';

export function NewPoll() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currUser = useSelector(authSelectors.selectValue);

    const [formData, setFormData] = useState({
        author: currUser.id,
        optionOneText: '',
        optionTwoText: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(pollActions.storeQuestion(formData)).then(() => { navigate("/"); });
    };

    return (
        <Container>
            <Banner text={`Udacity Employee Polls`} />

            <div className="flex flex-col justify-center items-center py-5">
                <Avatar isBordered color="success" size="lg" src={currUser.avatarURL} />
                <h3 className="text-3xl font-semibold mt-5 bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent uppercase">Which one would you rather?</h3>
                <p className="font-semibold text-default-400 text-small">Create Your Own Poll</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row md:justify-around">
                    <div className="w-full md:w-5/12 my-5">
                        <Card fullWidth>
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-col items-start">
                                    <p className="text-md">OPTION ONE</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <Textarea
                                    isRequired
                                    name="optionOneText"
                                    labelPlacement="outside"
                                    placeholder="Enter option one"
                                    className="w-full"
                                    onChange={handleChange}
                                    value={formData.optionOne}
                                />
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <p className="text-default-500 italic">hihi</p>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="w-full md:w-5/12 my-5">
                        <Card fullWidth>
                            <CardHeader className="flex gap-3">
                                <div className="flex flex-col items-start">
                                    <p className="text-md">OPTION TWO</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <Textarea
                                    isRequired
                                    name="optionTwoText"
                                    labelPlacement="outside"
                                    placeholder="Enter option two"
                                    className="w-full"
                                    onChange={handleChange}
                                    value={formData.optionTwo}
                                />
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <p className="text-default-500 italic">hihi</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center py-5">
                    <Button type="submit">Submit</Button>
                </div>

            </form>
        </Container>
    );
}