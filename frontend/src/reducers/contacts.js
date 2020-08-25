function contacts(state = [], action) {
  switch (action.type) {
    case "ADD_CONTACT":
      return [
        ...state,
        action.contact
      ];
    case "SET_CONTACTS":
      return action.contacts;
    case "DESTROY_CONTACT":
      return state = state.filter(s => s.id !== action.id);
    default:
      return state;
  }
}

export default contacts;
