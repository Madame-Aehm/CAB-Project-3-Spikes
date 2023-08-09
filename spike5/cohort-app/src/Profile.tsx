import React, { ChangeEvent } from 'react'
import { User } from './@types'

type Props = {
  user: User
}

function Profile (props: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }
  return (
    <div>
      <p>{ props.user.username } is a { props.user.star_sign }</p>
      <input onChange={handleChange} />
    </div>
  )
}

export default Profile