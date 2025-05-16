import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Box,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { HttpError } from "@refinedev/core";

interface IUser {
  // id?: string;
  name?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  is_approved?: boolean;
  is_phone_approved?: boolean;
  is_email_approved?: boolean;
  // role_id?: string;
  created_on?: string;
}

export const UserCreate = () => {
  const toast = useToast();
  
  const {
    refineCore: { formLoading, onFinish },
    saveButtonProps,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser, HttpError, IUser>({
    refineCoreProps: {
      onMutationError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to create user",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
      onMutationSuccess: (data) => {
        toast({
          title: "Success",
          description: "User created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset();
      },
    },
  });

  const onSubmit = (data: IUser) => {
    // Transform data to match your API expectations
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      is_approved: data.is_approved || false,
      is_phone_approved: data.is_phone_approved || false,
      is_email_approved: data.is_email_approved || false,
    };
    onFinish(userData);
  };

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(onSubmit),
      }}
    >
      <Box mb={6}>
        <FormControl mb={3} isInvalid={!!errors?.first_name}>
          <FormLabel>First Name</FormLabel>
          <Input
            id="first_name"
            type="text"
            {...register("first_name", { required: "First name is required" })}
          />
          <FormErrorMessage>
            {errors.first_name?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={3} isInvalid={!!errors?.last_name}>
          <FormLabel>Middle Name</FormLabel>
          <Input
            id="middle_name"
            type="text"
          />
        </FormControl>
        <FormControl mb={3} isInvalid={!!errors?.last_name}>
          <FormLabel>Last Name</FormLabel>
          <Input
            id="last_name"
            type="text"
            {...register("last_name", { required: "Last name is required" })}
          />
          <FormErrorMessage>
            {errors.last_name?.message}
          </FormErrorMessage>
        </FormControl>

       

        {/* <FormControl mb={3} isInvalid={!!errors?.role_id}>
          <FormLabel>Role</FormLabel>
          <Select
            id="role_id"
            placeholder="Select Role"
            {...register("role_id", {
              required: "Role is required",
            })}
          >
            <option value="admin">Admin</option>
            <option value="consultant">Consultant</option>
            <option value="chief_consultant">Chief Consultant</option>
          </Select>
          <FormErrorMessage>
            {errors.role_id?.message}
          </FormErrorMessage>
        </FormControl> */}

        <FormControl mb={3} display="flex" alignItems="center">
          <Checkbox
            id="is_approved"
            {...register("is_approved")}
          />
          <FormLabel htmlFor="is_approved" mb="0" ml={2}>
            Approved User
          </FormLabel>
        </FormControl>

        <FormControl mb={3} display="flex" alignItems="center">
          <Checkbox
            id="is_phone_approved"
            {...register("is_phone_approved")}
          />
          <FormLabel htmlFor="is_phone_approved" mb="0" ml={2}>
            Phone Verified
          </FormLabel>
        </FormControl>

        <FormControl mb={3} display="flex" alignItems="center">
          <Checkbox
            id="is_email_approved"
            {...register("is_email_approved")}
          />
          <FormLabel htmlFor="is_email_approved" mb="0" ml={2}>
            Email Verified
          </FormLabel>
        </FormControl>
      </Box>
    </Create>
  );
};