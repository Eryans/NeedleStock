import { useState, useEffect, useContext } from 'react'
import { getItems, registerItem } from '../axios/items_action'
import { getUserGroup, setGroup } from '../axios/group_action'
import { Button, Paper as div, TextField } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/system'
import { AuthContext } from '../context/AuthContext'
import GroupForm from '../customComponents/GroupForm'

export default function Groups(props) {
  const { user } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  const [groups, setGroups] = useState([])

  const validationSchema = yup
    .object({
      name: yup.string().required(),
      password: yup.string().required(),
      passwordCheck: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
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
      password: '',
      passwordCheck: '',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        getUserGroup({ id: user.id }).then((res) => {
          setGroups(res.groups)
        })
      } catch (err) {
        console.error(err + ' / ')
      }
    }
    fetchData()
  }, [])

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      try {
        setGroup({ values, id: user.id }).then((res) => {
          resolve()
        })
      } catch (err) {
        console.error(err)
      }
    })
  }
  const onSubmitNewGroup = (values) => {
    return new Promise((resolve) => {
      try {
        setGroup({ values, id: user.id }).then((res) => {
          setGroups([...groups, res])
          setShowForm(false)
          resolve()
        })
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      {groups.length <= 0 ? (
        <>
          <p>
            Il semblerait que vous n'ayez pas encore de groupe, créer en un si
            dessous &#128515;
          </p>
          <br></br>
          <GroupForm func={onSubmit}></GroupForm>
        </>
      ) : (
        <Box mt={2} mb={2}>
          {groups.map((grp, i) => {
            return (
              <div
                key={'key' + i}
                style={{
                  padding: 5,
                  border: '2px solid gray',
                  margin: 2,
                  cursor: 'pointer',
                }}
                onClick={props.groupFunc}
                data-value={grp._id}
              >
                {grp.name}
              </div>
            )
          })}
          {!showForm ? (
            <Button
              variant="contained"
              sx={{ width: '60%' }}
              onClick={() => setShowForm(true)}
            >
              Nouveau groupe
            </Button>
          ) : (
            <GroupForm func={onSubmitNewGroup}></GroupForm>
          )}
        </Box>
      )}
    </>
  )
}
