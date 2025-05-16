import React, { useRef, useState } from "react";
import { useList, useDelete } from "@refinedev/core";
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
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
  Spinner,
  Alert,
  AlertIcon,
  Center,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
}

export const UserList: React.FC = () => {
  const toast = useToast();
  const cancelRef = useRef(null);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data, isLoading, isError, error, refetch } = useList<IUser>({
    resource: "users",
    meta: { dataProviderName: "api" },
  });

  const { mutate: deleteUser } = useDelete();

  const openDialog = (id: number) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedId(null);
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      deleteUser(
        {
          resource: "users",
          id: selectedId,
          meta: { dataProviderName: "api" },
        },
        {
          onSuccess: () => {
            toast({
              title: "User deleted.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            closeDialog();
            refetch();
          },
          onError: (error: any) => {
            toast({
              title: "Error deleting user.",
              description: error?.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          },
        }
      );
    }
  };

  const users = data?.data || [];

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading users: {error?.message}
      </Alert>
    );
  }

  return (
    <>
      <List>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{`${user.first_name} ${user.last_name}`}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <ShowButton size="sm" recordItemId={user.id} hideText />
                      <EditButton size="sm" recordItemId={user.id} hideText />
                      <DeleteButton
                        size="sm"
                        colorScheme="red"
                        aria-label="Delete user"
                        onClick={() => openDialog(user.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </List>

      {/* Chakra UI Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};