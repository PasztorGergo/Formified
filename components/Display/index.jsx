import React from "react";
import Style from "./Display.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useElements } from "../../Context/ElementProvider";

export default function Display() {
  const { elements, setElements, setSelected } = useElements();

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
                  {(Dragprovided) => (
                    <div
                      className="flex flex-col items-center w-full py-1"
                      ref={Dragprovided.innerRef}
                      {...Dragprovided.draggableProps}
                      {...Dragprovided.dragHandleProps}
                      onClick={() => setSelected(element)}
                    >
                      {element.components?.length > 1 ? (
                        <Droppable droppableId={String(elements.length + 1)}>
                          {(prov) => (
                            <div {...prov.droppableProps} ref={prov.innerRef}>
                              {element.components.map((e, i) => (
                                <Draggable
                                  key={i}
                                  draggableId={String(i)}
                                  index={i}
                                >
                                  {(dragProv) => (
                                    <div
                                      ref={dragProv.innerRef}
                                      {...dragProv.dragHandleProps}
                                      {...dragProv.draggableProps}
                                      onClick={() => setSelected(element)}
                                    >
                                      {e.component}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                        </Droppable>
                      ) : (
                        element.components?.map((e) => e)
                      )}
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
