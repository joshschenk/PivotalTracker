const GET_STORIES = "stories/GET_STORIES"
const ADD_STORY = "stories/ADD_STORY"
const DELETE_STORY = "stories/DELETE_STORY"
const UPDATE_STORY = "stories/UPDATE_STORY"
const CLEAR_STORIES = "stories/CLEAR_STORIES"

export const clearStories = () => ({
    type: CLEAR_STORIES,
    payload: null
})

const updateStory = (story) => ({
    type: UPDATE_STORY,
    story
})

const deleteStory = (storyId) => ({
    type: DELETE_STORY,
    storyId
})

const getStories = (stories) => ({
    type: GET_STORIES,
    stories
})

const addStory = (story) => ({
    type: ADD_STORY,
    story
})

export const updateStoryThunk = (story, storyId) => async dispatch => {
    const response = await fetch(`/api/stories/update/${storyId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(story)
    });

    if (response.ok) {
        const res = await response.json();
        dispatch(updateStory(res))
    }
    else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
        return data.errors;
    }
} else {
    return ["An error occurred. Please try again."];
}

};

export const deleteStoryThunk = (storyId) => async (dispatch) => {
    const response = await fetch(`/api/stories/${storyId}`, {
        method: "DELETE"
    })
    if (response.ok) {

        const res = await response.json()


        dispatch(deleteStory(storyId))
    }
}

export const addStoryThunk = (story) => async (dispatch) => {


    const response = await fetch("/api/stories/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addStory(data));
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};




export const getStoriesThunk = (projectId) => async (dispatch) => {

    const response = await fetch(`/api/stories/${projectId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const projects = await response.json()

        dispatch(getStories(projects))
    }
}


export default function reducer(state = { stories: {}, story: {} }, action) {
    let newState = {}
    switch (action.type) {
        case GET_STORIES:
            return { stories: { ...action.stories }, story: {...state.story} };
        case ADD_STORY:
            newState = { stories: { ...state.stories }, story: { ...action.story } };
            newState.stories[action.story.id] = action.story
            return newState
        case DELETE_STORY:
            newState = { ...state.stories };
            delete newState[action.storyId]
            return { stories: { ...newState }, story: {} }
        case UPDATE_STORY:
            newState = { ...state.stories}
            newState[action.story.id] = action.story
            return { stories: { ...newState }, story: {...action.story} }
        case CLEAR_STORIES:
            return {}
        default:
            return state;
    }
}
