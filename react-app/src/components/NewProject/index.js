import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addProjectThunk } from "../../store/projects.js";
import { updateProjectThunk } from "../../store/projects.js";
import "./index.css"


export default function NewProject({update, setProjectId}) {
    const dispatch = useDispatch();
    const project = useSelector((state) => (state.projects.project ? state.projects.project : []))


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const { closeModal } = useModal();


    const handleNewProject = async (e) => {
        e.preventDefault()
        if (update)
            await dispatch(updateProjectThunk(name, description, project.id))
        else {
            const data = await dispatch(addProjectThunk(name, description))

            setProjectId(data.id)
        }
        closeModal()
    }

    useEffect(() => {
        if (update)
        {
            setName(project.name)
            setDescription(project.description)
        }
    }, [])

    return (
        <div className="projectContainer">
            <form className="projectForm" onSubmit={handleNewProject}>
                <input
                    type="text"
                    placeholder="Input Project Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <textarea
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="projectSubmit" type="submit">Add Project</button>
            </form>
        </div>
    )
}
