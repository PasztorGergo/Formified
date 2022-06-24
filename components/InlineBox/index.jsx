import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useElements } from "../../Context/ElementProvider";
import Style from "./Inline.module.css";

export default function InlineBox({ id }) {
  const { elements, findById } = useElements();
  console.log(id);
  return (
    <Droppable type="element" droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={Style.container}
        >
          {findById(id).container.map((x, index) => (
            <Draggable draggableId={x.id} index={index}>
              {(prov) => (
                <div
                  {...prov.dragHandleProps}
                  {...prov.draggableProps}
                  ref={prov.innerRef}
                  key={x.id}
                >
                  {x.component}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
