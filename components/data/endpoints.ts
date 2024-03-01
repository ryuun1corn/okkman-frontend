import { treeStructureInterface } from "./interface";

const endpointData: treeStructureInterface[] = [
  {
    name: "/api/events",
    actions: [
      {
        name: "Get all events",
        method: "GET",
      },
      {
        name: "Create a new event",
        method: "POST",
      },
    ],
    dropdowns: [
      {
        name: "/api/events/:id",
        actions: [
          { name: "Delete an event", method: "DELETE" },
          { name: "Update an event", method: "PATCH" },
        ],
      },
    ],
  },
  {
    name: "/api/committees",
    actions: [
      { name: "Get all committees", method: "GET" },
      { name: "Add a new committee", method: "POST" },
    ],
    dropdowns: [
      {
        name: "/api/committees/:id",
        actions: [{ name: "Remove a committee", method: "DELETE" }],
      },
      {
        name: "/api/committees/types",
        actions: [{ name: "Get all committee types", method: "GET" }],
      },
    ],
  },
  {
    name: "/api/groups",
    actions: [
      { name: "Create a group", method: "POST" },
      { name: "Get all groups", method: "GET" },
    ],
    dropdowns: [
      {
        name: "/api/groups/mentor",
        actions: [
          {
            name: "Create a new group and mentor",
            method: "POST",
          },
        ],
      },
      {
        name: "/api/groups/:id",
        actions: [
          { name: "Delete a group", method: "DELETE" },
          { name: "Update a group", method: "PATCH" },
        ],
        dropdowns: [
          {
            name: "/api/groups/:id/mentor",
            actions: [
              { name: "Update mentor of a group", method: "PATCH" },
              { name: "Change mentor of a group", method: "PUT" },
            ],
          },
        ],
      },
    ],
  },
];

export default endpointData;
