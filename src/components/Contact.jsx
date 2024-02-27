import React from "react";

const Contact = ({ contact, setDetails }) => {
  return (
    <tr style={{ cursor: "pointer" }} onClick={() => setDetails(contact)}>
      <td scope="col">{contact.phone}</td>
      <td scope="col">{contact.country?.name}</td>
    </tr>
  );
};

export default Contact;
