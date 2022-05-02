import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import BoxCenter from '../customComponents/BoxCenter'
import Groups from '../Layouts/Groups'
import {
  getSingleGroup,
  updateGroup,
  updateGroupitems,
} from '../axios/group_action'
import { TextField, Button, Input, Box } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getItems, getSingleItem, registerItem } from '../axios/items_action'
import ItemForm from '../customComponents/ItemForm'
import Items from '../Layouts/Items'

export default function HomePage() {
  const [currentGroup, setCurrentGroup] = useState(null)
  const [items, setItems] = useState([])

  const validationSchema = yup
    .object({
      name: yup.string().required(),
      quantity: yup.number().required(),
      content: yup.string(),
      value: yup.string(),
    })
    .required()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      quantity: 0,
    },
  })


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
