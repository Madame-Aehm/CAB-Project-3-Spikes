import NavBar from "../NavBar"


type Props = {
  children: React.ReactNode
}

const WithNav = (props: Props) => {
  return (
    <>
      <NavBar />
      { props.children }
    </>
  )
}

export default WithNav