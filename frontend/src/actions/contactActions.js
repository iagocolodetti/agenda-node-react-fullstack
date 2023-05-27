function setContact(contact = null) {
  return {
    type: "SET_CONTACT",
    contact
  };
}

const methods = {
  setContact
};

export default methods;
