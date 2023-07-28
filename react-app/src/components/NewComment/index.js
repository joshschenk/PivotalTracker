import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addStoryCommentThunk } from "../../store/stories";
// import { addStoryCommentThunk } from "../../store/comments";

export default function NewComment({ comment, story, isStory, update }) {
    const dispatch = useDispatch();

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();

    useEffect(() => {
        if (update) {
            setMessage(comment.message)
        }
    }, [])

    const handleNewComment = async (e) => {

        e.preventDefault()

        if (isStory) {
            const story_id = story.id
            const storyComment = {story_id, message}

            if (update)
            {

            }
            else {
                const data = await dispatch(addStoryCommentThunk(storyComment))
                if (data) {
                    console.log(data)

                    setErrors(data);
                }

                else {
                    closeModal()
                }

            }

        }


        // const story_id = story.id

        // const story = { name, description, project_id, difficulty }

        // if (update) {
        //     const data = await dispatch(updateStoryThunk(story, storyId))

        //     if (data) {
        //         setErrors(data);
        //     }
        //     else
        //         closeModal()
        // }
        // else {
        //     const data = await dispatch(addStoryThunk(story))
        //     if (data) {
        //         console.log(data)

        //         setErrors(data);
        //     }

        //     else {
        //         closeModal()
        //     }
        // }
    }

    return (
        <div className="commentContainer">
            <form className="commentForm" onSubmit={handleNewComment}>
                <textarea
                    placeholder="Provide Comment Here"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                />
                {errors.name && (
                    <div className="emailError">{errors.message}</div>
                )}

                <button className="projectSubmit" type="submit">{update ? "Update Comment" : "Add Comment"}</button>
            </form>
        </div>
    )
}
