const GET_STORY_COMMENTS = "comments/GET_STORY_COMMENTS"
const ADD_STORY_COMMENT = "comments/ADD_STORY_COMMENT"

const addStoryComment = (comment) => ({
    type: ADD_STORY_COMMENT,
    comment
})

const getStoryComments = (comments) => ({
    type: GET_STORY_COMMENTS,
    comments
})

export const addStoryCommentThunk = (comment) => async (dispatch) => {


    const response = await fetch("/api/comments/story", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addStoryComment(data));
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};


export const getCommentsThunk = (storyId) => async (dispatch) => {

    const response = await fetch(`/api/comments/story/${storyId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const comments = await response.json()

        dispatch(getStoryComments(comments))
    }
}




export default function reducer(state = { comments: {}, comment: {} }, action) {
    let newState = {}
    switch(action.type) {
        case GET_STORY_COMMENTS:
            return {comments: {...action.comments}, comment: null}
        case ADD_STORY_COMMENT:
        newState = {...state.comments}
        newState[action.comment.id] = action.comment
        return {comments: {...newState}, comment: {...action.comment}}
        default:
            return state;
    }
}
