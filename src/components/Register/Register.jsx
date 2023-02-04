import Form from '../Form/Form'

function Register({ handleSubmitRegistration }) {
  return (
    <main className="main">
      <Form handleSubmit={handleSubmitRegistration} />
    </main>
  )
}

export default Register
