import {
    Tabs,
    Tab,
    Listbox,
    ListboxItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Link,
} from "@nextui-org/react";
import { Fragment } from "react";

export { About }

function About() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-5xl font-bold mb-5 text-primary-600">Udacity Lab Employee Polls</h1>
                <p className="text-lg text-justify">
                    The final lab exercise of Udacity's React Nanodegree is a comprehensive project that encapsulates the core principles of React and Redux in building a dynamic and interactive voting portal. In this application, users can log in with their personal accounts to engage in a community-driven polling environment. They have the ability to post new polls, reflecting current topics or queries they are curious about, and vote on existing ones, contributing to the collective decision-making process. The user interface is designed to be intuitive, allowing users to easily navigate between polls they have participated in and those they have yet to explore. The polls are sorted by creation date, ensuring a seamless and up-to-date experience. This project not only tests the students' ability to implement state management and component-based architecture but also their skills in creating a user-friendly platform that encourages active participation and interaction within the company's ecosystem.
                </p>
                <p className="text-right font-bold w-full">HieuVV</p>
            </div>
        </div>
    );
}