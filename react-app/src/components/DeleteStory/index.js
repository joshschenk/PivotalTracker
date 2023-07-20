import { useDispatch } from "react-redux";
import { useEffect } from "react"
import { clearStories } from "../../store/stories";
import { useModal } from "../../context/Modal";
import { deleteStoryThunk } from "../../store/stories";

export default function DeleteStory({ storyId }) {


    const { closeModal } = useModal();

    const dispatch = useDispatch();




    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deleteStoryThunk(storyId))

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
