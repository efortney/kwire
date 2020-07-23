const INITIAL_STATE = {
  apiHealth: 200,
  currentUser: {},
  questions: [],
  query: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_API_STATUS':
      return {
        ...state, apiHealth: action.payload
      }

    case 'NEW_POST':
      return {
        ...state, questions: [...state.questions, action.payload]
      }

    case 'GET_USER_DATA_FROM_SESSION':
      return {
        ...state, currentUser: action.payload
      }

    case 'GET_RECENT_QUESTIONS':
      return {
        ...state, questions: action.payload
      }

    case 'GET_QUESTIONS_BY_TAG':
      return {
        ...state, questions: action.payload.formattedData, query: action.payload.tag
      }

    case 'GET_QUESTIONS_BY_AUTHOR':
      return {
        ...state, questions: action.payload
      }

    case 'UPDATE_SEARCH':
      return {
        ...state, questions: action.payload.formattedData, query: action.payload.query
      }

    case 'GET_QUESTIONS_BY_ID':
      return {
        ...state, questions: action.payload.formattedData
      }

    default:
      return {
        ...state
      };
  }
}