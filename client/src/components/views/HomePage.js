import { useState } from 'react'
import BoxCenter from '../customComponents/BoxCenter'
import Groups from '../Layouts/Groups'
import {
  getSingleGroup
} from '../axios/group_action'
import Items from '../Layouts/Items'

export default function HomePage() {
  const [currentGroup, setCurrentGroup] = useState(null)

  const chooseGroup = async (e) => {
    try {
      let groupId = e.target.getAttribute('data-value')
      getSingleGroup({ id: groupId }).then((res) => {
        setCurrentGroup(res)
      })
    } catch (err) {}
  }

  return (
    <>
      <BoxCenter>
        <h1>Home Page</h1>
        {!currentGroup ? (
          <Groups groupFunc={chooseGroup} />
        ) : (
          <>
            <h1>{currentGroup.name}</h1>
            <Items currentGroup={currentGroup} setCurrentGroup={setCurrentGroup}/>
          </>
        )}
      </BoxCenter>
    </>
  )
}
