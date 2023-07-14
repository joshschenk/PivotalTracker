const GET_PROJECTS = "stories/GET_PROJECTS"
const GET_PROJECT = "projects/GET_PROJECT"
const ADD_PROJECT = "projects/ADD_PROJECT"

const addProject = (project) => ({
    type: ADD_PROJECT,
    project
})

export const addProjectThunk = (name, description) => async (dispatch) => {
    console.log("GETS TO THUNK?????")
    const response = await fetch("/api/projects/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            description,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addProject(data));
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


const getProjects = (projects) => ({
    type: GET_PROJECTS,
    projects
})

const getProject = (project) => ({
    type: GET_PROJECT,
    project
})

export const getProjectsThunk = () => async (dispatch) => {

    const response = await fetch("/api/projects/", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const projects = await response.json()

        dispatch(getProjects(projects))
    }
}

export const getProjectThunk = (projectId) => async (dispatch) => {

    const response = await fetch(`/api/projects/${projectId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const project = await response.json()

        dispatch(getProject(project))
    }
}

export default function reducer(state = { projects: {}, project: {} }, action) {
    let newState = {}
    switch (action.type) {
        case GET_PROJECTS:
            return { projects: { ...action.projects }, project: null };
        case GET_PROJECT:
            return { projects: { ...state.projects }, project: { ...action.project} };
        case ADD_PROJECT:
            newState = { projects: { ...state.projects }, project: { ...action.project } };
            newState[action.project.id] = action.project
            return newState
        default:
            return state;
    }
}
