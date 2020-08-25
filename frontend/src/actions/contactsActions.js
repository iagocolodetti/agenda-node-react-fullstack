function addContact(contact) {
  return {
    type: "ADD_CONTACT",
    contact
  };
}

function setContacts(contacts = []) {
  return {
    type: "SET_CONTACTS",
    contacts
  };
}

function destroyContact(id) {
  return {
    type: "DESTROY_CONTACT",
    id
  };
}

export default {
  addContact,
  setContacts,
  destroyContact
};
