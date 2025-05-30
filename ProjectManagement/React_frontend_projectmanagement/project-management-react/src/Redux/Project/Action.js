import api from "../../config/api";
import { CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS,ACCEPT_INVITATION_SUCCESS,ACCEPT_INVITATION_REQUEST, FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS, ACCEPT_INVITATION_FAILURE } from "./ActionTypes";

export const fetchProjects=({category,tag})=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECTS_REQUEST})
    try{
        const {data}=await api.get("/api/projects",{params:{category,tag}})
        console.log("all projects ",data);
        dispatch({type:FETCH_PROJECTS_SUCCESS,projects:data})
    }catch(error){
        console.log("error",error)
    }
}

export const searchProjects=(keyword)=>async (dispatch)=>{
    dispatch({type:SEARCH_PROJECT_REQUEST})
    try{
        const {data}=await api.get("/api/projects/search?keyword="+keyword)
        console.log("search projects ",data);
        dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data})
    }catch(error){
        console.log("error",error)
    }
}


export const createProject=(projectData)=>async (dispatch)=>{
    dispatch({type:CREATE_PROJECT_REQUEST})
    try{
        const {data}=await api.post("/api/projects",projectData)
        console.log("create project ",data);
        dispatch({type:CREATE_PROJECT_SUCCESS,project:data})
    }catch(error){
        console.log("error",error)
    }
}

export const fetchProjectById=(id)=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
    try{
        const {data}=await api.get("/api/projects/"+id)
        console.log("fetch project ",data);
        dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS,project:data})
    }catch(error){
        console.log("error",error)
    }
}

export const deleteProject=({projectId})=>async (dispatch)=>{
    dispatch({type:DELETE_PROJECT_REQUEST})
    try{
        const {data}=await api.delete("/api/projects/"+projectId)
        console.log("delete project ",data);
        dispatch({type:DELETE_PROJECT_SUCCESS,projectId})
    }catch(error){
        console.log("error",error)
    }
}

export const inviteToProject=({email,projectId})=>async (dispatch)=>{
    dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try{
        const {data}=await api.post("/api/projects/invite",{email,projectId})
        console.log("invite projects ",data);
        dispatch({type:INVITE_TO_PROJECT_SUCCESS,payload:data})
    }catch(error){
        console.log("error",error)
    }
}



export const acceptInvitation = ({ token, navigate }) => async (dispatch) => {
  dispatch({ type: ACCEPT_INVITATION_REQUEST });

  try {
    const jwt = localStorage.getItem("token"); // ✅ Get actual JWT token for Authorization

    console.log("Invitation token used:", token);
    console.log("JWT used:", jwt);

    const { data } = await api.get(`/api/projects/accept_invitation?token=${token}`, {
      headers: {
        Authorization: `Bearer ${jwt}`, // ✅ Correct JWT token here
      },
    });

    navigate("/project/" + data.projectId);
    dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    console.log("accept invitation ", data);
  } catch (error) {
    console.log("error", error.response?.data || error.message);
    dispatch({
      type: ACCEPT_INVITATION_FAILURE,
      payload: error.message || "Error",
    });
  }
};
