import { treeStructureInterface } from "./interface";

const endpointData: treeStructureInterface[] = [
  {
    name: "/events",
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
        name: "/events/:id",
        actions: [
          { name: "Delete an event", method: "DELETE" },
          { name: "Update an event", method: "PATCH" },
        ],
        dropdowns: [],
      },
    ],
  },
  {
    name: "/committees",
    actions: [
      { name: "Get all committees", method: "GET" },
      { name: "Add a new committee", method: "POST" },
    ],
    dropdowns: [
      {
        name: "/committees/:id",
        actions: [{ name: "Remove a committee", method: "DELETE" }],
      },
      {
        name: "/committees/types",
        actions: [{ name: "Get all committee types", method: "GET" }],
      },
    ],
  },
  {
    name: "/groups",
    actions: [
      { name: "Create a group", method: "POST" },
      { name: "Get all groups", method: "GET" },
    ],
    dropdowns: [
      {
        name: "/groups/mentor",
        actions: [
          {
            name: "Create a new group and mentor",
            method: "POST",
          },
        ],
      },
      {
        name: "/groups/:id",
        actions: [
          { name: "Delete a group", method: "DELETE" },
          { name: "Update a group", method: "PATCH" },
        ],
        dropdowns: [
          {
            name: "/groups/:id/mentor",
            actions: [
              { name: "Update mentor of a group", method: "PATCH" },
              { name: "Change mentor of a group", method: "PUT" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "/sponsors",
    actions: [{ name: "Get all sponsors", method: "GET" }],
    dropdowns: [
      {
        name: "/sponsors/:id",
        actions: [
          {
            name: "Delete a sponsor",
            method: "DELETE",
          },
        ],
        dropdowns: [
          {
            name: "/sponsors/:id/events",
            actions: [
              {
                name: "Associate sponsor and event",
                method: "PUT",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "/speakers",
    actions: [
      { name: "Get all speakers", method: "GET" },
      { name: "Add a speaker", method: "POST" },
    ],
    dropdowns: [
      {
        name: "/speakers/:id",
        actions: [{ name: "Remove a speaker", method: "DELETE" }],
        dropdowns: [
          {
            name: "/speakers/:id/events",
            actions: [
              {
                name: "Associate speaker and event",
                method: "PUT",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "/mentees",
    actions: [
      { name: "Get all mentees", method: "GET" },
      {
        name: "Add a mentee",
        method: "POST",
      },
    ],
    dropdowns: [],
  },
];

export default endpointData;
