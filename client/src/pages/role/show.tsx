import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/chakra-ui";

import { Heading, Text, Spacer } from "@chakra-ui/react";

import type { ICategory, IRole, IUser } from "../../interfaces";

export const RoleShow: React.FC = () => {
  const { query: queryResult } = useShow<IRole>();
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
        Role Name
      </Heading>
      {/* <Text mt={2}>{record?.rolename}</Text> */}


      <Spacer mt={2} />
      {/* <MarkdownField value={record?.rolename} /> */}
    </Show>
  );
};
