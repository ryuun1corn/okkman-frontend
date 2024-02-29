import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import endpointData from "@/components/data/endpoints";

import { treeStructureInterface } from "../../data/interface";

function renderNodes(nodeObjects: treeStructureInterface[]) {
  return (
    <Accordion
      type="multiple"
      className="w-full divide-y-[1px] divide-slate-300"
    >
      {nodeObjects.map((node) => {
        return (
          <AccordionItem value={node.name} key={node.name} className="border-0">
            <AccordionTrigger className="px-2">{node.name}</AccordionTrigger>
            <AccordionContent className="pl-3">
              <ul className=" divide-y-[1px] divide-slate-400">
                <li className="bg-slate-400 bg-opacity-15 rounded-t-lg">
                  {node.dropdowns !== undefined
                    ? renderNodes(node.dropdowns)
                    : null}
                </li>
                {node.actions.map((action) => {
                  return (
                    <li key={action} className="p-2">
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
  return renderNodes(endpointData);
}
