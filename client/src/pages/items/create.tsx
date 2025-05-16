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

import type { IPost, IItems } from "../../interfaces";
export const ItemsCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm<IItems>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <FormControl mb="3" >
                <FormLabel>Item Name</FormLabel>
                <Input
                    id="itemname"
                    type="text"
                    {...register("itemname", { required: "Item name is required" })}
                />
                <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Item Code</FormLabel>
                <Input
                    id="itemcode"
                    type="text"
                    {...register("itemcode", { required: "Item code is required" })}
                />
                <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Price</FormLabel>
                <Input
                    id="price"
                    type="number"
                    {...register("price", { required: "price is required" })}
                />
                <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
            </FormControl>
        </Create>
    );
};