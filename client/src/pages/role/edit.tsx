import { useEffect } from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import type { IRole } from "../../interfaces";

export const RoleEdit = () => {
  const {
    refineCore: { formLoading, query: queryResult },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IRole>();

  const { options } = useSelect({
    resource: "role",

    defaultValue: queryResult?.data?.data.id,
    queryOptions: { enabled: !!queryResult?.data?.data.id },
  });

  useEffect(() => {
    resetField("role.id");
  }, [options]);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
      <FormLabel>Role Name</FormLabel>
        <Input
          id="rolename"
          type="text"
          {...register("firstname", { required: "Role Name is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
     
    </Edit>
  );
};
