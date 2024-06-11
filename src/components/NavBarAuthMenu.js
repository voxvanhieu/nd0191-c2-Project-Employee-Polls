import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    NavbarItem,
    Link,
    Button
} from "@nextui-org/react";

import { authSelectors } from "../data/store";

import { history } from "../helpers";
import { NavBarUserAvatar } from "./NavBarUserAvatar"

export { NavBarAuthMenu }

function NavBarAuthMenu() {

    history.location = useLocation();
    const isLoginRoute = history.location.pathname === '/login';

    const authUser = useSelector(authSelectors.selectValue);

    return (
        <Fragment>
            {!isLoginRoute && !authUser &&
                <NavbarItem>
                    <Button
                        href={`/login`}
                        as={Link}
                        color="primary"
                        variant="flat"
                    >
                        Login
                    </Button>
                </NavbarItem>
            }

            {!!authUser &&
                <NavBarUserAvatar />
            }
        </Fragment >
    );
}
