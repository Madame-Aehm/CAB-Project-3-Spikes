import React from 'react'
import Nav from './Nav'

type Props = {
  children: React.ReactNode
}

const NavLayout = (props: Props) => {
  return (
    <>
      <Nav />
      { props.children }
    </>
  )
}

export default NavLayout