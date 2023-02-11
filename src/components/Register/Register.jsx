import React from "react";

import Form from "../Form/Form.jsx";

function Register({ handleSubmitRegistration }) {
  return (
    <main className="main">
      <Form handleSubmit={handleSubmitRegistration} />
    </main>
  );
}

export default Register;
