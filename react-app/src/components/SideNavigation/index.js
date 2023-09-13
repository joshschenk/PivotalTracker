import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import OpenModalButton from '../OpenModalButton';
import NewProject from '../NewProject';
import NewStory from "../NewStory";

import DeleteProject from '../DeleteProject/DeleteProject';
import { getProjectThunk, getProjectsThunk } from '../../store/projects';
import './index.css';

function SideNavigation() {
    const [projectId, setProjectId] = useState(null)
    const dispatch = useDispatch()



    const projects = Object.values(
        useSelector((state) => (state.projects.projects ? state.projects.projects : []))
    );

    const project = useSelector((state) => (state.projects.project ? state.projects.project : []))



    useEffect(() => {
        dispatch(getProjectsThunk())
        if (projectId)
        {
            dispatch(getProjectThunk(projectId))
        }

        // console.log(project)

    }, [dispatch, projectId])





    return (
        <div className='projectNavContainer'>
            <select id="selectProject"
                name='project'
                onChange={e => {
                    setProjectId(e.target.value)

                }}
                value={projectId}
            >
                <option value='default' disabled selected hidden>Select a Project</option>
                {
                    projects.map((p) => {

                        return (<option key={p.id} value={p.id}>{p.name}</option>)
                    })
                }

            </select>
            <OpenModalButton update={false} isDiv={true} modalComponent={<NewProject setProjectId={setProjectId} className="projectModal" />} buttonText="New Project" />
            {project.id && <OpenModalButton isDiv={true} buttonText="Edit Project" className="projectModal" modalComponent={<NewProject update={true} ></NewProject>}></OpenModalButton>}

            {projectId && <OpenModalButton isDiv={true} className="projectModal" modalComponent={<DeleteProject setProjectId={setProjectId} projectId={projectId} className="DeleteModal" />} buttonText="Delete Project" />}

            {project.id && <OpenModalButton isDiv={true} className="projectModal" buttonText="Add Story" modalComponent={<NewStory update={false} project={project} projectId={project.id}></NewStory>}></OpenModalButton>}

            {/* <div className='myWork'>
                My Work
            </div>
            <div className='backlog'>
                Backlog
            </div>
            <div className="blocked">
                Blocked
            </div>
            <div className="done">
                Done
            </div> */}
        </div>
    )
}

export default SideNavigation
