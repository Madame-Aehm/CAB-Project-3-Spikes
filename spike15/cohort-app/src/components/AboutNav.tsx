
import { navContainerStyles } from '../styles/navbar'
import { NavLink } from 'react-router-dom'


const AboutNav = () => {
  return (
    <div style={navContainerStyles}>
    <NavLink to="developer">Learn about the Developer</NavLink>
    ||
    <NavLink to="company">Learn about the Company</NavLink>
  </div>
  )
}

export default AboutNav