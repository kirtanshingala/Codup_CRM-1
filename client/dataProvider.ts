import { DataProvider } from "@refinedev/core";

const API_URL = "http://localhost:5000/api";

interface CustomDataProvider extends DataProvider {
  // You can extend with custom methods if needed
}

export const dataProvider: CustomDataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    
    const response = await fetch(`${API_URL}/${resource}?_page=${current}&_limit=${pageSize}`);
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const totalHeader = response.headers.get("x-total-count");
    const total = totalHeader ? parseInt(totalHeader) : data.length;

    return {
      data,
      total,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    console.log("data", data);
    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return {
      data,
    };
  },

  getApiUrl: () => API_URL,

  // Optional: implement other methods as needed
  // getMany, updateMany, deleteMany, etc.
};