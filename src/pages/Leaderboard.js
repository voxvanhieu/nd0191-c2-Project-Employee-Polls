import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Spinner,
    Tooltip,
    getKeyValue
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useAsyncList } from "@react-stately/data";
import { userSelectors } from "../data/store";
import { Banner } from "../components/Banner";
import { Container } from "../components/Container";


export { Leaderboard }

function Leaderboard() {

    const columns = [
        { name: "USER", uid: "name" },
        { name: "ANSWERED", uid: "answered" },
        { name: "CREATED", uid: "created" },
    ];

    const users = Object.values(useSelector(userSelectors.selectValue))
        .map((item, index) => {
            return {
                id: item.id,
                name: item.name,
                avatarURL: item.avatarURL,
                answered: Object.keys(item.answers).length,
                created: item.questions.length
            }
        }).sort((a, b) => b.answered - a.answered);

    const [isLoading, setIsLoading] = React.useState(true);

    let listUsers = useAsyncList({
        async load({ signal }) {
            setIsLoading(false);

            return {
                items: users,
            };
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatarURL }}
                        description={`@${user.id}`}
                        name={cellValue}
                    >
                        {user.id}
                    </User>
                );
            case "answered":
                return (
                    <Chip className="capitalize" color="warning" size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "created":
                return (
                    <Chip className="capitalize" color="success" size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Container>
            <Banner text="The most contributed employee" />

            <Table
                aria-label="User Leaderboard table"
                sortDescriptor={listUsers.sortDescriptor}
                onSortChange={listUsers.sort}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "name" ? "start" : "center"}
                            allowsSorting={column.uid !== "name"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    items={listUsers.items}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading..." />}
                    emptyContent={"No rows to display."}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Container>
    );
}