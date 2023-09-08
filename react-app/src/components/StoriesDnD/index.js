import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoriesThunk, updateStatusThunk } from "../../store/stories";
import SideNavigation from "../SideNavigation";
import Story from "../Story"
import "./index.css"


function StoriesDnD() {



    const dispatch = useDispatch()

    const project = useSelector((state) => (state.projects.project ? state.projects.project : {}))

    const [columns, setColumns] = useState({});
    const stories = Object.values(
        useSelector((state) => (state.stories.stories ? state.stories.stories : []))
    );

    // useEffect(() => {
    //     if (project.id) {
    //         dispatch(getStoriesThunk(project.id))


    //     }

    // }, [project]);


    let columnsFromBackend = {}




    useEffect(() => {
        if (project.id) {

            dispatch(getStoriesThunk(project.id))


        }

        // console.log(columns)
        // // if (columns)
        // // for (let c of columns)
        // //     for (let i of c.items) {
        // //         console.log(i.name)
        // // }

        // for (let c of Object.values(columns))
        //     for (let i = 0; i < c.items.length; i++)
        //     {
        //         console.log(c, i, c.items[i])
        //         dispatch(updateStatusThunk({status_index: i, status: c.name.toUpperCase()}, c.items[i].id))
        //     }
    }, [project]);

    useEffect(() => {
        let current = []
        let backlog = []
        let done = []

        current = stories.filter(s => s.status === "CURRENT").map(s =>

                            ({ id: `${s.id}`, content: s })
                        )
        backlog = stories.filter(s => s.status === "BACKLOG").map(s =>

            ({ id: `${s.id}`, content: s    })
        )

        done = stories.filter(s => s.status === "DONE").map(s =>

            ({ id: `${s.id}`, content: s })
        )

        const sortByIndex = (a, b) => {
            return a.content.status_index - b.content.status_index
        }

        current.sort(sortByIndex)
        backlog.sort(sortByIndex)
        done.sort(sortByIndex)
        columnsFromBackend = {
            '1': {
                name: "Current",
                items: current
            },
            '2': {
                name: "Backlog",
                items: backlog
            },
            '3': {
                name: "Done",
                items: done
            }
        };
        setColumns({ ...columnsFromBackend })
    }, [JSON.stringify(stories)])



    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (!(source.droppableId === destination.droppableId && destination.index === source.index))
        {
            if (destination.droppableId === '1') {
                dispatch(updateStatusThunk({ status_index: parseInt(destination.index), status: "CURRENT", source: parseInt(source.droppableId), source_index: source.index }, draggableId))

            }
            else if (destination.droppableId === '2')
                dispatch(updateStatusThunk({ status_index: parseInt(destination.index), status: "BACKLOG", source: parseInt(source.droppableId), source_index: source.index }, draggableId))
            else if (destination.droppableId === '3')
                dispatch(updateStatusThunk({ status_index: parseInt(destination.index), status: "DONE", source: parseInt(source.droppableId), source_index: source.index }, draggableId))
        }
        // console.log("post action ", destination)
        if (source.droppableId !== destination.droppableId) {

            // console.log("droppableId ", destination.droppableId, source.droppableId)

            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);


            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else if (source.droppableId === destination.droppableId && destination.index !== source.index) {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);


            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    return (
        // <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <div className="storiesContainer">
            <SideNavigation></SideNavigation>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (

                        <div className={`statusContainer ${column.name}Container`}
                            // style={{
                            //     display: "flex",
                            //     flexDirection: "column",
                            //     alignItems: "center"
                            // }}
                            key={columnId}
                        >
                            <div className="statusHeader">
                                <h2>{column.name}</h2>
                            </div>
                            {/* <div style={{ margin: 8 }}> */}
                            <div >
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                // style={{
                                                //     background: snapshot.isDraggingOver
                                                //         ? "lightblue"
                                                //         : "lightgrey",
                                                //     padding: 4,
                                                //     width: 300,
                                                //     minHeight: 500
                                                // }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        // style={{
                                                                        //     userSelect: "none",
                                                                        //     padding: 16,
                                                                        //     margin: "0 0 8px 0",
                                                                        //     minHeight: "50px",
                                                                        //     backgroundColor: snapshot.isDragging
                                                                        //         ? "#263B4A"
                                                                        //         : "#456C86",
                                                                        //     color: "white",
                                                                        //     ...provided.draggableProps.style
                                                                        // }}
                                                                    >
                                                                        {/* {item.content.name} */}
                                                                        <Story project={project} story={item.content} />
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default StoriesDnD;
