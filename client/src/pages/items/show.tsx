import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/chakra-ui";

import { Heading, Text, Spacer } from "@chakra-ui/react";

import type { ICategory, IItems } from "../../interfaces";

export const ItemsShow: React.FC = () => {
  const { query: queryResult } = useShow<IItems>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

//   const { data: categoryData } = useOne<ICategory>({
//     resource: "categories",
//     id: record?.id || "",
//     queryOptions: {
//       enabled: !!record?.id,
//     },
//   });

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Item Name
      </Heading>
      <Text mt={2}>{record?.itemname}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Item Code
      </Heading>
      <Text mt={2}>{record?.itemcode}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Price
      </Heading>
      <Text mt={2}>{record?.price}</Text>


      <Spacer mt={2} />
      {/* <MarkdownField value={record?.role} /> */}
    </Show>
  );
};
