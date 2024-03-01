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
  >,
  setAction: Dispatch<SetStateAction<string>>
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
                <li className="bg-white bg-opacity-50">
                  {node.dropdowns !== undefined
                    ? renderNodes(
                        node.dropdowns,
                        setEndpoint,
                        setMethod,
                        setAction
                      )
                    : null}
                </li>
                {node.actions.map((action, index) => {
                  return (
                    <li key={index} className="p-2">
                      <SheetClose asChild>
                        <Button
                          type="submit"
                          variant="link"
                          className="w-full justify-start"
                          onClick={() => {
                            setEndpoint(node.name);
                            setMethod(action.method);
                            setAction(action.name);
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
  setAction,
}: {
  setEndpoint: Dispatch<SetStateAction<string>>;
  setMethod: Dispatch<
    SetStateAction<"GET" | "POST" | "DELETE" | "PATCH" | "PUT" | null>
  >;
  setAction: Dispatch<SetStateAction<string>>;
}) {
  return renderNodes(endpointData, setEndpoint, setMethod, setAction);
}
