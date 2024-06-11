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

export { TestPage }

function TestPage() {
    return (
        <>
            <Tabs aria-label="Navigation">
                <Tab key="home" href="/home">Home</Tab>
                <Tab key="about" href="/about">About</Tab>
            </Tabs>
            <Listbox aria-label="Navigation">
                <ListboxItem key="home" href="/home">Home</ListboxItem>
                <ListboxItem key="about" href="/about">About</ListboxItem>
            </Listbox>
            <Dropdown>
                <DropdownTrigger>
                    <Button>Open</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Navigation">
                    <DropdownItem key="home" href="/home">Home</DropdownItem>
                    <DropdownItem key="about" href="/about">About</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Link href="/login">Home</Link>
            <Link href="/about">About</Link>
        </>
    );
}