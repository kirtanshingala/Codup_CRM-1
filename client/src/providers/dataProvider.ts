import { DataProvider } from "@refinedev/core";

const customDataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    const start = (current - 1) * pageSize;
    const end = start + pageSize;

    const url = new URL(`${apiUrl}/${resource}`);
    url.searchParams.append("_start", String(start));
    url.searchParams.append("_end", String(end));

    if (sorters && sorters.length > 0) {
      const sorter = sorters[0];
      url.searchParams.append("_sort", sorter.field);
      url.searchParams.append("_order", sorter.order);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const total = Number(response.headers.get("X-Total-Count")) || 0;
    
    return {
      data,
      total,
    };
  },

  getOne: async ({ resource, id, }) => {
    const response = await fetch(`${apiUrl}/${resource}/${id}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    console.log("response", response);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch resource');
    }
    const data = await response.json();
    console.log("data", data);
    return { data };
  },
  
  create: async ({ resource, variables }) => {
    try {
      const response = await fetch(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(variables),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (!response.ok) {
        console.error("Backend error:", {
          status: response.status,
          statusText: response.statusText,
          url: `${apiUrl}/${resource}`,
          requestBody: variables,
          responseBody: data,
        });
        
        // Throw a more descriptive error
        throw new Error(
          data.error || 
          data.message || 
          `Request failed (${response.status})`
        );
      }
  
      return { data };
    } catch (error) {
      throw error;
    }
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${apiUrl}/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update resource');
    }

    const data = await response.json();
    return { data };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const response = await fetch(`${apiUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete resource');
    }

    const data = await response.json();
    return { data };
  },

  // Optional methods
  getApiUrl: () => apiUrl,
  
  // Optional: implement getMany if needed
  getMany: async ({ resource, ids, meta }) => {
    const response = await fetch(`${apiUrl}/${resource}?id=${ids.join(',')}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch resources');
    }
    const data = await response.json();
    return { data };
  },
});

export default customDataProvider;