import React from 'react'

export default function Landing(props) {
  return (
    <div>
    {!props.user ? (<>
      <div><p>welcome to MOOD, where you can keep track of your mood throughout the day</p></div>
    </>) : 
    (<>
      {/* mood tracking happens here */}
    </>)}
    </div>
  )
}
