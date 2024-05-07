import { useNavigate } from "react-router-dom"

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Here be dragons...</h1>
      <button onClick={() => navigate("/")}>Back to safety</button>
    </div>
  )
}

export default Error404