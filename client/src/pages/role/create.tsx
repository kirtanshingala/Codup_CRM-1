import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import type { IPost, IRole } from "../../interfaces";
export const RoleCreate = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IRole>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <FormControl mb="3" >
        <FormLabel>Role Name</FormLabel>
        <Input
          id="rolename"
          type="text"
          {...register("rolename", { required: "Role Name is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
    
      
    </Create>
  );
};