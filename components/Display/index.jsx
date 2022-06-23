import React from "react";
import Style from "./Display.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useElements } from "../../Context/ElementProvider";
import { isEmpty } from "lodash";
import { useState } from "react";

export default function Display() {
  const { elements, setElements, setSelected } = useElements();
  const [placeholderProps, setPlaceholderProps] = useState({});

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
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={Style.dropable}
            >
              {elements.map((element, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(Dragprovided, snapshot) => (
                    <div
                      className={`flex flex-col items-center w-full py-1 ${
                        snapshot.isDragging
                          ? "border-2 border-slate-600 border-dashed bg-white"
                          : "border-none bg-transparent"
                      }`}
                      ref={Dragprovided.innerRef}
                      {...Dragprovided.draggableProps}
                      {...Dragprovided.dragHandleProps}
                      onClick={() => setSelected(element)}
                    >
                      {element.component}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                <div
                  className="placeholder"
                  style={{
                    top: placeholderProps.clientY,
                    left: placeholderProps.clientX,
                    height: placeholderProps.clientHeight,
                    width: placeholderProps.clientWidth,
                  }}
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
