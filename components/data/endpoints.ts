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
          { name: "Get an event", method: "GET" },
          { name: "Delete an event", method: "DELETE" },
          { name: "Update an event", method: "PATCH" },
        ],
        dropdowns: [
          {
            name: "/events/:id/sponsors/:sponsorId",
            actions: [
              { name: "Connect sponsor to event", method: "PUT" },
              { name: "Disconnect sponsor from event", method: "DELETE" },
            ],
          },
          {
            name: "/events/:id/speakers/:speakerId",
            actions: [
              { name: "Connect speaker to event", method: "PUT" },
              { name: "Disconnect speaker from event", method: "DELETE" },
            ],
          },
        ],
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
        actions: [
          { name: "Get a committee", method: "GET" },
          { name: "Update a committee", method: "PATCH" },
          { name: "Remove a committee", method: "DELETE" },
        ],
      },
      {
        name: "/committees/mentors",
        actions: [{ name: "Get all mentors", method: "GET" }],
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
        name: "/groups/:id",
        actions: [
          { name: "Get a group", method: "GET" },
          { name: "Delete a group", method: "DELETE" },
          { name: "Update a group", method: "PATCH" },
        ],
        dropdowns: [
          {
            name: "/groups/:id/mentors/:mentorId",
            actions: [{ name: "Change mentor of a group", method: "PUT" }],
          },
        ],
      },
    ],
  },
  {
    name: "/sponsors",
    actions: [
      { name: "Get all sponsors", method: "GET" },
      { name: "Add a sponsor", method: "POST" },
    ],
    dropdowns: [
      {
        name: "/sponsors/:id",
        actions: [
          {
            name: "Get a sponsor",
            method: "GET",
          },
          {
            name: "Update a sponsor",
            method: "PATCH",
          },
          {
            name: "Delete a sponsor",
            method: "DELETE",
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
        actions: [
          { name: "Get a speaker", method: "GET" },
          { name: "Update a speaker", method: "PATCH" },
          { name: "Remove a speaker", method: "DELETE" },
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
    dropdowns: [
      {
        name: "/mentees/:id",
        actions: [
          { name: "Get a mentee", method: "GET" },
          { name: "Update a mentee", method: "PATCH" },
          { name: "Remove a mentee", method: "DELETE" },
        ],
        dropdowns: [
          {
            name: "/mentees/:id/groups/:groupNumber",
            actions: [{ name: "Change group of mentee", method: "PUT" }],
          },
        ],
      },
    ],
  },
];

export default endpointData;
