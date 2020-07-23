const SET_API_STATUS = 'SET_API_STATUS';
const GET_USER_DATA_FROM_SESSION = 'GET_USER_DATA_FROM_SESSION';
const GET_RECENT_QUESTIONS = 'GET_RECENT_QUESTIONS';
const GET_QUESTIONS_BY_TAG = 'GET_QUESTIONS_BY_TAG';
const GET_QUESTIONS_BY_ID = 'GET_QUESTIONS_BY_ID';
const GET_QUESTIONS_BY_AUTHOR = 'GET_QUESTIONS_BY_AUTHOR';
const UPDATE_SEARCH = 'UPDATE_SEARCH';
const NEW_POST = 'NEW_POST';

/**
 * Creates a new post 
 * @param {object} postData: An object containing data of the post to create
 */
export const createNewPost = (postData) => async dispatch => {
  let data = await fetch('/api/questions', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  const formattedData = await data.json();
  dispatch({
    type: NEW_POST,
    payload: formattedData
  });
}

/**
 * Set the API health to a desired status code for component testing. 
 * @param {string} statusCode: A string represnting the network status code of the api. 
 */
export const setAPIStatus = (statusCode) => async dispatch => {
  dispatch({
    type: SET_API_STATUS,
    payload: statusCode
  });
}

/**
 * Fetches the user data for the current active session.  
 */
export const getUserDataFromSession = () => async dispatch => {
  let data = await fetch('/api/currentuser');
  const formattedData = await data.json();
  dispatch({
    type: GET_USER_DATA_FROM_SESSION,
    payload: formattedData
  });
}

/**
 * Gets the most recent questions. 
 */
export const getRecentQuestions = () => async dispatch => {
  let data = await fetch('/api/questions/recent');
  const formattedData = await data.json();
  dispatch({
    type: GET_RECENT_QUESTIONS,
    payload: formattedData
  });
}

/**
 * Gets questions by tag.  
 */
export const getQuestionsByTag = (tag) => async dispatch => {
  let data = await fetch(`/api/questions/tag/${tag}`);
  const formattedData = await data.json();
  dispatch({
    type: GET_QUESTIONS_BY_TAG,
    payload: { formattedData, tag }
  });
}

/**
 * Gets questions by ID.  
 */
export const getQuestionsById = (id) => async dispatch => {
  let data = await fetch(`/api/questions/${id}`);
  const formattedData = await data.json();
  dispatch({
    type: GET_QUESTIONS_BY_ID,
    payload: { formattedData, id }
  });
}

/**
 * Gets questions by author.  
 */
export const getQuestionsByAuthor = (id) => async dispatch => {
  let data = await fetch(`/api/questions/author/${id}`);
  const formattedData = await data.json();
  dispatch({
    type: GET_QUESTIONS_BY_AUTHOR,
    payload: formattedData
  });
}

/**
 * Searches for all questions containing a specific term
 */
export const updateSearch = (query) => async dispatch => {
  let data = await fetch(`/api/questions/query/${query}`);
  const formattedData = await data.json();
  dispatch({
    type: UPDATE_SEARCH,
    payload: { formattedData, query }
  });
}