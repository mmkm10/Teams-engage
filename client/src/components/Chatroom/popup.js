import React from 'react'
import NewWindow from 'react-new-window'
import {v1 as uuid} from 'uuid'
import {useHistory} from 'react-router'


const Demo = () => {
  const history=useHistory();
  const id=uuid();

  return (
    console.log(window.location.href),

    <NewWindow url={`/room/${id}`}>
    </NewWindow>

  )

}

export default Demo