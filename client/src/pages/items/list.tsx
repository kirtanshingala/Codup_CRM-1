import React from "react";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { type GetManyResponse, useMany } from "@refinedev/core";
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/chakra-ui";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Box,
  Select,
  Heading,
} from "@chakra-ui/react";

import { ColumnFilter, ColumnSorter } from "../../components/table";
import { Pagination } from "../../components/pagination";
import type { FilterElementProps, ICategory, IItems, IPost } from "../../interfaces";

export const ItemsList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IItems>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
    ],
    [],
  );

  const users = [
    { id: 1, itemname: "M and A", itemcode: "MANDA12", price: "10000" },
    { id: 2, itemname: "Business", itemcode: "BUS123", price: "20000" },
    { id: 3, itemname: "IT", itemcode: "ITD123", price: "30000" },
    { id: 4, itemname: "Finance", itemcode: "FIN123", price: "40000" },
  ];

  return (
    <List>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Item Name</Th>
              <Th>Item Code</Th>
              <Th>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.itemname}</Td>
                <Td>{user.itemcode}</Td>
                <Td>{user.price}</Td>
                  <Td>
                  <HStack spacing={2}>
                    <ShowButton size="sm" recordItemId={user.id} hideText />
                    <EditButton size="sm" recordItemId={user.id} hideText />
                    <DeleteButton size="sm" recordItemId={user.id} hideText />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      /> */}
    </List>
  );
};
