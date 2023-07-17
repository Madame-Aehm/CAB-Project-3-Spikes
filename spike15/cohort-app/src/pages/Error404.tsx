import { useNavigate } from "react-router"

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>No page found...</h1>
      <button onClick={() => navigate(-1)} >Go back...</button>
      <button onClick={() => navigate("/", { replace: true, state: "testing... from Error page" })}>Go Home...</button>
    </div>
  )
}

export default Error404