const GET_PROJECTS = "stories/GET_PROJECTS"
const GET_PROJECT = "projects/GET_PROJECT"
const ADD_PROJECT = "projects/ADD_PROJECT"
const DELETE_PROJECT = "projects/DELETE_PROJECT"
const UPDATE_PROJECT = "projects/UPDATE_PROJECT"

const updateProject = (project) => ({
    type: UPDATE_PROJECT,
    project
})

const deleteProject = (projectId) => ({
    type: DELETE_PROJECT,
    projectId
})

const addProject = (project) => ({
    type: ADD_PROJECT,
    project
})

const getProjects = (projects) => ({
    type: GET_PROJECTS,
    projects
})

const getProject = (project) => ({
    type: GET_PROJECT,
    project
})


export const updateProjectThunk = (name, description, projectId) => async dispatch => {

    const response = await fetch(`/api/projects/update/${projectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, description})
    });

    if (response.ok) {
        const res = await response.json();
        dispatch(updateProject(res))
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
    else {
        return ["An error occurred. Please try again."];
    }
};

export const deleteProjectThunk = (projectId) => async (dispatch) => {

    const response = await fetch(`/api/projects/delete/${projectId}`, {
        method: "DELETE"
    })
    if (response.ok) {

        const res = await response.json()


        dispatch(deleteProject(projectId))
    }



}
export const addProjectThunk = (name, description) => async (dispatch) => {
    
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
        return data;
    } else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};




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
            return { projects: { ...action.projects }, project: {...state.project} };
        case GET_PROJECT:
            return { projects: { ...state.projects }, project: { ...action.project} };
        case ADD_PROJECT:
            newState = { projects: { ...state.projects }, project: { ...action.project } };
            newState.projects[action.project.id] = action.project
            return newState
        case DELETE_PROJECT:
            newState = { ...state.projects };
            delete newState[action.projectId]
            return { projects: { ...newState }, project: {} }
        case UPDATE_PROJECT:
            newState = { ...state.projects }
            newState[action.project.id] = action.project
            return { projects: { ...newState }, project: { ...action.project } }
        default:
            return state;
    }
}
