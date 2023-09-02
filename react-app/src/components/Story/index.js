import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DeleteStory from "../DeleteStory";
import NewStory from "../NewStory";
import NewComment from "../NewComment";

import OpenModalButton from "../OpenModalButton";
import { getStoryThunk } from "../../store/stories";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import "./index.css"



function Story({project, story}) {

    const [showDetails, setShowDetails] = useState(false)

    const handleDetails = (e) => {
        e.preventDefault()

        setShowDetails(() => !showDetails)

        let details = document.getElementById(e.currentTarget.dataset.id);

        if (details.className === "detailsHidden") {
            details.className = "detailsShow"
        }
        else {
            details.className = "detailsHidden"
        }


    }

    // const dispatch = useDispatch()
    // dispatch(getStoryThunk(storyId))
    // const story = useSelector((state) => (state.stories.story ? state.stories.story : {}))

    return (
        <div className="storyContainer">
            <div className="storyHeader">
                <div data-id={story.id} data-description={story.description} onClick={handleDetails} className="story" key={story.id}>{story.name}</div>
                <div className="editDelete">
                    <OpenModalButton className="updateStoryModal" buttonText="Update" modalComponent={<NewStory story={story} update={true} projectId={project.id}></NewStory>}></OpenModalButton>
                    <OpenModalButton className="deleteStoryModal" buttonText="Delete" modalComponent={<DeleteStory storyId={story.id} ></DeleteStory>}></OpenModalButton>
                </div>
            </div>
            <div className="detailsHidden" id={story.id}>
                <div className="descrip">{story.description}</div>
                <div classname="diff">{story.difficulty} points</div>

                <div className="commentbox">
                    <div className="com">
                        <div className="commenttext">Comments</div>
                        <OpenModalButton className="addCommentModal" buttonText="Add Comment" modalComponent={<NewComment isStory={true} story={story}></NewComment>}></OpenModalButton>

                    </div>

                    {story.comments?.map((comment) => (
                        <div className="message">
                            <div>{comment.message}</div>
                            <div>-{comment.user.username}</div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Story;
