import Form from "../Form/Form.jsx";

function Login({ handleSubmitLogin }) {
  return (
    <main className="main">
      <Form handleSubmit={handleSubmitLogin} />
    </main>
  );
}

export default Login;
