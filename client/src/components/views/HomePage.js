import { useState } from 'react'
import { useForm } from 'react-hook-form'
import BoxCenter from '../customComponents/BoxCenter'
import Groups from '../Layouts/Groups'
import { getSingleGroup } from '../axios/group_action'
import { TextField, Button, Input } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function HomePage() {
  const validationSchema = yup
    .object({
      name: yup.string().required(),
      quantity:yup.number().required(),
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

  const [currentGroup, setCurrentGroup] = useState(null)
  const chooseGroup = async (e) => {
    try {
      let group = e.target.getAttribute('data-value')
      getSingleGroup({ id: group }).then((res) => {
        setCurrentGroup(res)
      })
      setCurrentGroup()
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
            <ul>
              {currentGroup.items.length > 0 ? (
                currentGroup.items.map((item) => {
                  ;<li>{item.name}</li>
                })
              ) : (
                <div>Pas encore d'object enregistrés</div>
              )}
            </ul>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2em',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                name="name"
                {...register('name')}
                type="text"
                variant="standard"
                placeholder="Nom"
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : null}
                required
              ></TextField>
              <Input
                name="quantity"
                {...register('quantity')}
                type="number"
                variant="standard"
                placeholder="Quantité"
                error={!!errors?.quantity}
                helperText={errors?.quantity ? errors.quantity.message : null}
                required
              ></Input>
            </form>
            <Button>Ajouter un objet</Button>
          </>
        )}
      </BoxCenter>
    </>
  )
}
