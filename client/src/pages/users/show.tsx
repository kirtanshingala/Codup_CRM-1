import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/chakra-ui";

import { Heading, Text, Spacer } from "@chakra-ui/react";

import type { ICategory, IUser } from "../../interfaces";

export const UserShow: React.FC = () => {
  const { query: queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  // const { data: categoryData } = useOne<ICategory>({
  //   resource: "categories",
  //   id: record?.id || "",
  //   queryOptions: {
  //     enabled: !!record?.id,
  //   },
  // });

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        First Name 
      </Heading>
      <Text mt={2}>{record?.first_name}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Last Name
      </Heading>
      <Text mt={2}>{record?.last_name}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Email
      </Heading>
      <Text mt={2}>{record?.email}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Role
      </Heading>
      <Text mt={2}>{record?.role}</Text>

      <Spacer mt={2} />
      {/* <MarkdownField value={record?.role} /> */}
    </Show>
  );
};
