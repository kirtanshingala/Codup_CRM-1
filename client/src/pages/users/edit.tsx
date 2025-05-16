import { useParams } from "react-router";
import { Edit } from "@refinedev/chakra-ui";
import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import { useDataProvider } from "@refinedev/core";

interface IUser {
  name?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  is_approved?: boolean;
  is_phone_approved?: boolean;
  is_email_approved?: boolean;
  created_on?: string;
}

export const UserEdit = () => {
  const { id } = useParams();
  const getDataProvider = useDataProvider();
  const dataProvider = getDataProvider("api"); 
  const [loadingUser, setLoadingUser] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IUser>({
    refineCoreProps: {
      resource: "users",
      id,
      meta: { dataProviderName: "api" },
    },
  });

  useEffect(() => {
    if (!id) {
      setUserNotFound(true);
      setLoadingUser(false);
      return;
    }

    const checkUserExists = async () => {
      try {
        debugger
        await dataProvider.getOne<IUser>({
          resource: "users",
          id: id.toString(),
        });

        setUserNotFound(false);
      } catch (error: any) {
        if (error.status === 404) {
          console.warn("User not found");
          setUserNotFound(true);
        } else {
          console.error("Unexpected error", error);
        }
      } finally {
        setLoadingUser(false);
      }
    };

    // checkUserExists();
  }, [dataProvider, id]);

  if (loadingUser) {
    return <Spinner />;
  }

  if (userNotFound) {
    return <Text color="red.500">User not found</Text>;
  }

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box mb={6}>
        <FormControl mb={3} isInvalid={!!errors?.first_name}>
          <FormLabel>First Name</FormLabel>
          <Input
            id="first_name"
            type="text"
            {...register("first_name", { required: "First name is required" })}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Middle Name</FormLabel>
          <Input id="middle_name" type="text" {...register("middle_name")} />
        </FormControl>

        <FormControl mb={3} isInvalid={!!errors?.last_name}>
          <FormLabel>Last Name</FormLabel>
          <Input
            id="last_name"
            type="text"
            {...register("last_name", { required: "Last name is required" })}
          />
        </FormControl>

        <FormControl mb={3} display="flex" alignItems="center">
          <Checkbox id="is_approved" {...register("is_approved")} />
          <FormLabel htmlFor="is_approved" mb="0" ml={2}>
            Approved User
          </FormLabel>
        </FormControl>

        <FormControl mb={3} display="flex" alignItems="center">
          <Checkbox id="is_phone_approved" {...register("is_phone_approved")} />
          <FormLabel htmlFor="is_phone_approved" mb="0" ml={2}>
            Phone Verified
          </FormLabel>
        </FormControl>

        <FormControl mb={3} display="flex" alignItems="center">
          <Checkbox id="is_email_approved" {...register("is_email_approved")} />
          <FormLabel htmlFor="is_email_approved" mb="0" ml={2}>
            Email Verified
          </FormLabel>
        </FormControl>
      </Box>
    </Edit>
  );
};
