import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar
} from "@nextui-org/react";

import { authSelectors } from '../data/store';
import { authActions } from "../data/store";

export { NavBarUserAvatar }

function NavBarUserAvatar() {
    const authUser = useSelector(authSelectors.selectValue);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
    }

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={`${authUser.name}`}
                    size="sm"
                    src={`${authUser.avatarURL}`}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{`${authUser.id}`}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
