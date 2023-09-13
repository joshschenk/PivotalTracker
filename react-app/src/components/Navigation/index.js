import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import NewProject from '../NewProject';
import './Navigation.css';
import tracker from "../../assets/tracker.png"

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const project = useSelector(state => state.projects.project)

	return (
		<div className="navContainer">

			{/* <Link to="/"> */}

				<img className="tracker" src={tracker} alt="tracker" />
			{/* </Link> */}

			{isLoaded && (

					<ProfileButton className="profileButton" user={sessionUser} />

			)}
		</div>
	)
}

export default Navigation;
