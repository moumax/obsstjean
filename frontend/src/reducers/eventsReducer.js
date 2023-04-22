export default function eventsReducer(state, action) {
  switch (action.type) {
    case "TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "VOID_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "VOID_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "SITE":
      return {
        ...state,
        site: action.payload,
      };
    case "VOID_SITE":
      return {
        ...state,
        site: action.payload,
      };
    case "DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "VOID_DATE":
      return {
        ...state,
        date: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
