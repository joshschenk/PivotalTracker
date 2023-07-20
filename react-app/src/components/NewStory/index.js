import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addStoryThunk, updateStoryThunk } from "../../store/stories";
import "./index.css"

export default function NewStory({ story, projectId, update }) {
    const dispatch = useDispatch();
    const storyId = story?.id

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [difficulty, setDifficulty] = useState(1)
    const { closeModal } = useModal();

    useEffect(() => {
        if (update) {
            setName(story.name)
            setDescription(story.description)
            setDifficulty(story.difficulty)
        }
    }, [])

    const handleNewStory = (e) => {

        e.preventDefault()
        const project_id = projectId
        const story = {name, description, project_id, difficulty}
        console.log("IN HANDLE", storyId)
        if (update)
            dispatch(updateStoryThunk(story, storyId))
        else
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
