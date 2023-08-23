import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavigation from "../SideNavigation";
import NewStory from "../NewStory";
import "./index.css"
import { getStoriesThunk } from "../../store/stories";
import { getProjectThunk, getProjectsThunk } from "../../store/projects";
import { useModal } from "../../context/Modal";
import DeleteStory from "../DeleteStory";
import OpenModalButton from "../OpenModalButton";
import NewProject from "../NewProject";
import Navigation from "../Navigation";
import NewComment from "../NewComment";
import Story from "../Story"

function Stories() {

    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState(false)

    const project = useSelector((state) => (state.projects.project ? state.projects.project : {}))
    //const stories = useSelector((state) => (state.stories.stories ? state.stories.stories : {}))

    const stories = Object.values(
        useSelector((state) => (state.stories.stories ? state.stories.stories : []))
    );


    useEffect(() => {
        if (project.id) {
            dispatch(getStoriesThunk(project.id))

        }

    }, [project]);


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

    const handleStory = (e) => {
        e.preventDefault()
    }

    return (
        <div className="storiesContainer">
            <SideNavigation></SideNavigation>
            <div className="currentStories">
                <div className="currentHeader">
                    <h2>Current</h2>
                    <div className="buttonz">
                        {project.id && <OpenModalButton buttonText="Edit Project" modalComponent={<NewProject update={true} ></NewProject>}></OpenModalButton>}

                        {project.id && <OpenModalButton buttonText="Add Story" modalComponent={<NewStory update={false} projectId={project.id}></NewStory>}></OpenModalButton>}
                    </div>
                </div>
                {stories?.map((story) => (
                    <>
                    {/* {console.log(story)} */}
                    <Story project={project} story={story}/>
                    </>
                    // <div className="storyContainer">
                    //     <div className="storyHeader">
                    //         <div data-id={story.id} data-description={story.description} onClick={handleDetails} className="story" key={story.id}>{story.name}</div>
                    //         <div className = "editDelete">
                    //             <OpenModalButton buttonText="Update" modalComponent={<NewStory story={story} update={true} projectId={project.id}></NewStory>}></OpenModalButton>
                    //             <OpenModalButton buttonText="Delete" modalComponent={<DeleteStory storyId={story.id} ></DeleteStory>}></OpenModalButton>
                    //         </div>
                    //     </div>
                    //     <div className="detailsHidden" id={story.id}>
                    //         <div className="descrip">{story.description}</div>
                    //         <div classname="diff">{story.difficulty} points</div>

                    //         <div className="commentbox">
                    //             <div className="com">
                    //                 <div className="commenttext">Comments</div>
                    //                 <OpenModalButton buttonText="Add Comment" modalComponent={<NewComment  isStory={true} story={story}></NewComment>}></OpenModalButton>

                    //             </div>

                    //                 {story.comments?.map((comment) => (
                    //                     <div className="message">
                    //                         <div>{comment.message}</div>
                    //                         <div>-{comment.user.username}</div>
                    //                     </div>
                    //                 ))}

                    //         </div>
                    //     </div>
                    // </div>

                ))}

            </div>
            <div className="backlog">
                <div className="currentHeader">
                    <h2>Backlog</h2>
                    <div>
                        {/* {project.id && <OpenModalButton buttonText="Edit Project" modalComponent={<NewProject update={true} ></NewProject>}></OpenModalButton>} */}

                        {project.id && <OpenModalButton buttonText="Add Story" modalComponent={<NewStory update={false} projectId={project.id}></NewStory>}></OpenModalButton>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Stories;
