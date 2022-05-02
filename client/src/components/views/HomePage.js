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

export default function HomePage() {
  const [currentGroup, setCurrentGroup] = useState(null)
  const [customFieldsnbr, setCustomFieldsNbr] = useState([])
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

  const addRow = () => {
    let newField = {}
    setCustomFieldsNbr([...customFieldsnbr, newField])
  }

  const chooseGroup = async (e) => {
    try {
      let groupId = e.target.getAttribute('data-value')
      getSingleGroup({ id: groupId }).then((res) => {
        setCurrentGroup(res)
      })
    } catch (err) {}
  }

  const delRow = async (e) => {
    setCustomFieldsNbr((prev) => {
      const next = [...prev]
      next.pop()
      return next
    })
  }

  const onSubmit = async (values) => {
    return new Promise((resolve) => {
      try {
        let customF = document.querySelectorAll('[data-key]')
        let customFieldsArray = Array.from(customF).map((field) => {
          let customObject = {
            name: field.childNodes[0].firstChild.firstChild.value,
            content: field.childNodes[1].firstChild.firstChild.value,
            // MUI is a pain to get data
          }
          return customObject
        })
        const newBody = {
          name: values.name,
          quantity: values.quantity,
          customFields: customFieldsArray,
        }
        registerItem(newBody).then((res) => {
          updateGroupitems({ item: res, groupId: currentGroup._id }).then(
            (response) => {
              setCurrentGroup(response)
            },
          )
          resolve()
        })
      } catch (err) {}
    })
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        getSingleGroup({ id: currentGroup._id }).then((res) => {
          setItems([]) // Empty State before filling it again to avoid double
          res.items.map((item, index) => {
            getSingleItem({ _id: item }).then((response) => {
              setItems((items) => [...items, response])
            })
          })
        })
      } catch (err) {}
    }
    fetchItems()
  }, [currentGroup])
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
              {items.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      return (
                        <tr key={`${item._id}`}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                name="name"
                {...register('name')}
                type="text"
                variant="standard"
                placeholder="Nom"
                error={!!errors?.name}
                helpertext={errors?.name ? errors.name.message : null}
                required
              ></TextField>
              <Input
                name="quantity"
                {...register('quantity')}
                type="number"
                variant="standard"
                placeholder="Quantité"
                error={!!errors?.quantity}
                helpertext={errors?.quantity ? errors.quantity.message : null}
                required
              ></Input>
              {customFieldsnbr.length > 0 && (
                <Button onClick={delRow}>Retirer un objet</Button>
              )}
              {customFieldsnbr.map((field, i) => {
                return (
                  <Box key={`key${i}`} data-key={`fieldBox${i}`}>
                    <TextField
                      name={`content${i}`}
                      id={`content${i}`}
                      type="text"
                      variant="standard"
                      placeholder="Contenu"
                      error={!!errors?.content}
                      helpertext={
                        errors?.content ? errors.content.message : null
                      }
                      required
                      key={`keyContent${i}`}
                    ></TextField>
                    <TextField
                      name={`value${i}`}
                      id={`value${i}`}
                      type="text"
                      variant="standard"
                      placeholder="Valeur"
                      error={!!errors?.value}
                      helpertext={errors?.value ? errors.value.message : null}
                      required
                      key={`keyValue${i}`}
                    ></TextField>
                  </Box>
                )
              })}
              <Button onClick={addRow}>Ajouter une valeur</Button>
              <Button type="submit">Créer un objet</Button>
            </form>
          </>
        )}
      </BoxCenter>
    </>
  )
}
