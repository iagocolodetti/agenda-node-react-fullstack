function setContact(contact = null) {
  return {
    type: "SET_CONTACT",
    contact
  };
}

export default {
  setContact
};
