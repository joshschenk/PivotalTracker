import { useDispatch } from "react-redux";
import { useEffect } from "react"
import { clearStories } from "../../store/stories";
import { useModal } from "../../context/Modal";
import { deleteProjectThunk } from "../../store/projects";

import "./index.css"

export default function DeleteProject({setProjectId, projectId }) {

    const { closeModal } = useModal();

    const dispatch = useDispatch();




    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteProjectThunk(projectId))
        dispatch(clearStories())
        setProjectId("default")

        closeModal()


    }

    const handleNotDelete = (e) => {
        e.preventDefault();
        closeModal();
    }
    return (
        <div className="deleteConfirm">
            <div>Delete?</div>
            <button className="yesDelete" onClick={handleDelete}>Yes</button>
            <button className="noDelete" onClick={handleNotDelete}>No</button>

        </div>

    );
}
