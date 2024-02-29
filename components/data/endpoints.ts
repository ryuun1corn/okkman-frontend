const endpointData = [
  {
    name: "/events",
    actions: ["Get all events", "Create a new event"],
    dropdowns: [
      {
        name: "/events/:id",
        actions: ["Delete an event", "Update an event"],
      },
    ],
  },
  {
    name: "/committees",
    actions: ["Get all committees", "Add a new committee"],
    dropdowns: [
      {
        name: "/committees/:id",
        actions: ["Remove a committee"],
      },
      {
        name: "/committees/types",
        actions: ["Get all committee types"],
      },
    ],
  },
  {
    name: "/groups",
    actions: ["Create a group", "Get all groups"],
    dropdowns: [
      {
        name: "/groups/mentor",
        actions: ["Create a new group and mentor"],
      },
      {
        name: "/groups/:id",
        actions: ["Delete a group", "Update a group"],
        dropdowns: [
          {
            name: "/groups/:id/mentor",
            actions: ["Update mentor of a group", "Change mentor of a group"],
          },
        ],
      },
    ],
  },
];

export default endpointData;
