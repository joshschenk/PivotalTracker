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
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();

    useEffect(() => {
        if (update) {
            setName(story.name)
            setDescription(story.description)
            setDifficulty(story.difficulty)
        }
    }, [])

    const handleNewStory = async (e) => {

        e.preventDefault()
        const project_id = projectId
        const story = {name, description, project_id, difficulty}

        if (update) {
            const data = await dispatch(updateStoryThunk(story, storyId))

            if (data) {
                setErrors(data);
            }
            else
                closeModal()
        }
        else {
            const data = await dispatch(addStoryThunk(story))
            if (data) {
                console.log(data)

                setErrors(data);
            }

            else {
                closeModal()
            }
        }
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
                {errors.name && (
                    <div className="emailError">{errors.name}</div>
                )}
                <textarea
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                    <div className="emailError">{errors.description}</div>
                )}
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

                <button className="projectSubmit" type="submit">{update ? "Update Story" : "Add Story"}</button>
            </form>
        </div>
    )
}
