export default function usersReducer(state, action) {
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "VOID_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "VOID_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "VOID_ROLE":
      return {
        ...state,
        role: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
