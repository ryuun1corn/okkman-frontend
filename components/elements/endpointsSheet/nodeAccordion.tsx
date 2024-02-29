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
import { Dispatch, SetStateAction } from "react";

function renderNodes(
  nodeObjects: treeStructureInterface[],
  setEndpoint: Dispatch<SetStateAction<string>>,
  setMethod: Dispatch<
    SetStateAction<"GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null>
  >
) {
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
                    ? renderNodes(node.dropdowns, setEndpoint, setMethod)
                    : null}
                </li>
                {node.actions.map((action, index) => {
                  return (
                    <li key={index} className="p-2">
                      <SheetClose asChild>
                        <Button
                          type="submit"
                          className="w-full"
                          onClick={() => {
                            setEndpoint(node.name);
                            setMethod(action.method);
                          }}
                        >
                          {action.name}
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

export function EndpointsAccordion({
  setEndpoint,
  setMethod,
}: {
  setEndpoint: Dispatch<SetStateAction<string>>;
  setMethod: Dispatch<
    SetStateAction<"GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null>
  >;
}) {
  return renderNodes(endpointData, setEndpoint, setMethod);
}
