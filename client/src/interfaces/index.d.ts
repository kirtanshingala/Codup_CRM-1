import type { Column } from "@tanstack/react-table";

export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}
export interface IUser {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;  
}
export interface IRole {
  id: number;
  rolename: string;
}
export interface IItems {
  id: number;
  itemname: string;
  itemcode: string;
  price: number;
}

export interface ColumnButtonProps {
  column: Column<any, any>; // eslint-disable-line
}

export interface FilterElementProps {
  value: any; // eslint-disable-line
  onChange: (value: any) => void; // eslint-disable-line
}
