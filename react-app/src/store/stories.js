const GET_STORIES = "stories/GET_STORIES"
const ADD_STORY = "projects/ADD_STORY"

const getStories = (stories) => ({
    type: GET_STORIES,
    stories
})

const addStory = (story) => ({
    type: ADD_STORY,
    story
})



export const addStoryThunk = (story) => async (dispatch) => {

    console.log("GETS to thunk")
    console.log(story)
    const response = await fetch("/api/stories/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
    });
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        dispatch(addStory(data));
        return null;
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

    const response = await fetch("/api/stories/", {
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
            return { stories: { ...action.stories }, project: null };
        case ADD_STORY:
            newState = { stories: { ...state.stories }, project: { ...action.story } };
            newState[action.story.id] = action.story
            return newState
        default:
            return state;
    }
}
