function contact(state = null, action) {
  switch (action.type) {
    case "SET_CONTACT":
      return action.contact;
    default:
      return state;
  }
}

export default contact;
