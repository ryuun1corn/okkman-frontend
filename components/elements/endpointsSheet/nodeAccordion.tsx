import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { treeStructureInterface } from "./interface";

function renderNodes(nodeObjects: treeStructureInterface[]) {
  return (
    <Accordion type="multiple" className="w-full">
      {nodeObjects.map((node) => {
        return (
          <AccordionItem value={node.name} key={node.name}>
            <AccordionTrigger>{node.name}</AccordionTrigger>
            <AccordionContent>
              <ul className="pl-5 space-y-2 bg-slate-300 bg-opacity-35 p-3">
                <li>
                  {node.dropdowns !== undefined
                    ? renderNodes(node.dropdowns)
                    : null}
                </li>
                {node.actions.map((action) => {
                  return (
                    <li key={action}>
                      <SheetClose asChild>
                        <Button type="submit" className="w-full">
                          {action}
                        </Button>
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export function EndpointsAccordion() {
  const mainNodes: treeStructureInterface[] = [
    {
      name: "/api/events",
      actions: ["Get all events", "Create a new event"],
      dropdowns: [
        {
          name: "/api/events/:id",
          actions: ["Delete an event", "Update an event"],
        },
      ],
    },
    {
      name: "/api/committees",
      actions: ["Get all committees", "Add a new committee"],
      dropdowns: [
        {
          name: "/api/committees/:id",
          actions: ["Remove a committee"],
        },
        {
          name: "/api/committees/types",
          actions: ["Get all committee types"],
        },
      ],
    },
    {
      name: "/api/groups",
      actions: ["Create a group", "Get all groups"],
      dropdowns: [
        {
          name: "/api/groups/mentor",
          actions: ["Create a new group and mentor"],
        },
        {
          name: "/api/groups/:id",
          actions: ["Delete a group", "Update a group"],
          dropdowns: [
            {
              name: "/api/groups/:id/mentor",
              actions: ["Update mentor of a group", "Change mentor of a group"],
            },
          ],
        },
      ],
    },
  ];
  return renderNodes(mainNodes);
}
