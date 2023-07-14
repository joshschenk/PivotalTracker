import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addStoryThunk } from "../../store/stories";
import "./index.css"

export default function NewStory({ projectId }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [difficulty, setDifficulty] = useState(1)
    const { closeModal } = useModal();

    const handleNewStory = (e) => {

        console.log("Gets to handle")
        e.preventDefault()
        const project_id = projectId
        const story = {name, description, project_id, difficulty}
        dispatch(addStoryThunk(story))
        closeModal()
    }

    return (
        <div className="projectContainer">
            <form className="storyForm" onSubmit={handleNewStory}>
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
                <label>
                    Difficulty
                </label>
                <input
                    type="number"
                    placeholder=""
                    value={difficulty}
                    onChange={(e) => {
                        setDifficulty(e.target.value)
                    }}
                />

                <button className="projectSubmit" type="submit">Add Project</button>
            </form>
        </div>
    )
}
