import React from "react";
import Style from "./Display.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useElements } from "../../Context/ElementProvider";

export default function Display() {
  const { elements, setElements } = useElements();

  return (
    <div aria-label="Editor Display" className={Style.display}>
      <DragDropContext onDragEnd={null}>
        <Droppable droppableId>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {elements.map((el, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(Dragprovided) => (
                    <div
                      ref={Dragprovided.innerRef}
                      {...Dragprovided.draggableProps}
                      {...Dragprovided.dragHandleProps}
                    >
                      {el}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
