import React from "react";
import { useLocation } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button
} from "@nextui-org/react";

import { history } from "../helpers";
import { NavBarAuthMenu } from "./NavBarAuthMenu";

export { Nav };

function Nav() {

    history.location = useLocation();

    function isActiveThisMenu(menuItem) {
        return menuItem === history.location.pathname
    }

    return (
        <Navbar
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}>
            <NavbarBrand>
                <p className="font-bold text-inherit">Employee Polls</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={isActiveThisMenu("/")}>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={isActiveThisMenu("/leaderboard")}>
                    <Link color="foreground" href="/leaderboard">
                        Leaderboard
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={isActiveThisMenu("/add")}>
                    <Link color="foreground" href="/add">
                        New
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={isActiveThisMenu("/about")}>
                    <Link color="foreground" href="/about">
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavBarAuthMenu />
            </NavbarContent>
        </Navbar >
    );
}
