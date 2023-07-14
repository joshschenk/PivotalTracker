import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addProjectThunk } from "../../store/projects.js";
import "./index.css"


export default function NewProject({cmon}) {
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const { closeModal } = useModal();

    const handleNewProject = (e) => {
        e.preventDefault()
        console.log("GETS TO HANDLE??")
        dispatch(addProjectThunk(name, description))
        closeModal()
    }

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
