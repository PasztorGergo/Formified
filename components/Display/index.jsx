import React from "react";
import Style from "./Display.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useElements } from "../../Context/ElementProvider";

export default function Display() {
  const { elements, setElements } = useElements();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newItems = [...elements];
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    setElements(newItems);
  };

  return (
    <div aria-label="Editor Display" className={Style.display}>
      <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
        <Droppable droppableId={String(elements.length)}>
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
                      className="flex flex-col"
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
