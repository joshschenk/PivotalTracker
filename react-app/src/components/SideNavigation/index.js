import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import NewProject from '../NewProject';
import './index.css';

function SideNavigation() {
    return (
        <div className='projectNavContainer'>
            <OpenModalButton modalComponent={<NewProject className="projectModal"/>} buttonText="New Project"/>
            <div className='myWork'>
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
            </div>
        </div>
    )
}

export default SideNavigation
