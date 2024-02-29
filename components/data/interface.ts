export interface actionInterface {
  name: string;
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  description?: string;
}

export interface treeStructureInterface {
  name: string;
  actions: actionInterface[];
  dropdowns?: treeStructureInterface[];
}
