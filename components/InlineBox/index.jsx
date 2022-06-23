import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useElements } from "../../Context/ElementProvider";
import Style from "./Inline.module.css";

export default function InlineBox() {
  const { elements } = useElements();
  return (
    <Droppable type="element" droppableId={String(elements.length)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={Style.container}
        >
          <Draggable
            draggableId={String(elements.length)}
            index={elements.length}
          >
            {(prov) => (
              <p
                {...prov.dragHandleProps}
                {...prov.draggableProps}
                ref={prov.innerRef}
              >
                Hello
              </p>
            )}
          </Draggable>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
