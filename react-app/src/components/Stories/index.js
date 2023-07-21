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

function Stories() {

    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState(false)

    const project = useSelector((state) => (state.projects.project ? state.projects.project : {}))
    //const stories = useSelector((state) => (state.stories.stories ? state.stories.stories : {}))

    const stories = Object.values(
        useSelector((state) => (state.stories.stories ? state.stories.stories : []))
    );


    useEffect(() => {
        if (project.id)
            dispatch(getStoriesThunk(project.id))



    }, [project]);


    const handleDetails = (e) => {
        e.preventDefault()

        setShowDetails(() => !showDetails)

        console.log(showDetails)
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
        console.log("STORY GOT CLICKED")
    }

    return (
        <div className="storiesContainer">
            <SideNavigation></SideNavigation>
            <div className="currentStories">
                <div className="currentHeader">
                    <h2>Current</h2>
                    <div>
                        <OpenModalButton buttonText="Edit Project" modalComponent={<NewProject update={true} ></NewProject>}></OpenModalButton>

                        <OpenModalButton buttonText="Add Story" modalComponent={<NewStory update={false} projectId={project.id}></NewStory>}></OpenModalButton>
                    </div>
                </div>
                {stories?.map((story) => (
                    <div className="storyContainer">
                        <div className="storyHeader">
                            <div data-id={story.id} data-description={story.description} onClick={handleDetails} className="story" key={story.id}>{story.name}</div>
                            <div className = "editDelete">
                                <OpenModalButton buttonText="Update" modalComponent={<NewStory story={story} update={true} projectId={project.id}></NewStory>}></OpenModalButton>
                                <OpenModalButton buttonText="Delete" modalComponent={<DeleteStory storyId={story.id} ></DeleteStory>}></OpenModalButton>
                            </div>
                        </div>
                        <div className="detailsHidden" id={story.id}>
                            <div>{story.description}</div>
                            <div>{story.difficulty}</div>
                        </div>
                    </div>

                ))}

            </div>
            <div className="backlog">
                <h2>Backlog</h2>
            </div>
        </div>

    )
}

export default Stories;
