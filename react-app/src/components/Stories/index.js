import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavigation from "../SideNavigation";
import "./index.css"
import { getProjectsThunk } from "../../store/projects";
import OpenModalButton from "../OpenModalButton";
import NewStory from "../NewStory";

function Stories() {

    const dispatch = useDispatch();

    const projects = Object.values(
        useSelector((state) => (state.projects.projects ? state.projects.projects : []))
    );

    useEffect(() => {
        dispatch((getProjectsThunk()));
    }, [dispatch]);

    console.log(projects)



    return (
        <div className="storiesContainer">
            <SideNavigation></SideNavigation>
            <div>
                {projects.map((project) => (
                    <div>
                        <OpenModalButton modalComponent={<NewStory projectId={project.id}/>} buttonText={project.name} key={project.id}/>
                        <div>
                            {project.stories?.map((story) => (
                                <div key={story.id}>{story.name}</div>

                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Stories;
