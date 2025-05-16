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
import type { FilterElementProps, ICategory, IPost, IRole } from "../../interfaces";

export const RoleList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IRole>[]>(
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
    { id: 1, rolename: "Admin" },
    { id: 2, rolename: "Consultant" },
    { id: 3, rolename: "Chief Consultant" },
  ];

  return (
    <List>
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.rolename}</Td>
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
