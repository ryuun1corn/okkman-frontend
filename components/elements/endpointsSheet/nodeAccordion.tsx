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
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { requestDataSchema } from "../requestUrlCard/schema";

function renderNodes(
  nodeObjects: treeStructureInterface[],
  setForm: UseFormSetValue<z.infer<typeof requestDataSchema>>
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
                    ? renderNodes(node.dropdowns, setForm)
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
                            setForm("endpoint", node.name);
                            setForm("method", action.method);
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
}: {
  setEndpoint: UseFormSetValue<z.infer<typeof requestDataSchema>>;
}) {
  return renderNodes(endpointData, setEndpoint);
}
