
import { Button, TextField } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/system'

export default function GroupForm(props) {
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
  return (
    <form
      onSubmit={handleSubmit(props.func)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2em',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
          width: '50%',
        }}
      >
        <TextField
          name="name"
          {...register('name')}
          type="text"
          variant="standard"
          placeholder="Nom du groupe"
          error={!!errors?.name}
          helperText={errors?.name ? errors.name.message : null}
          required
        ></TextField>
        <TextField
          name="password"
          {...register('password')}
          type="password"
          variant="standard"
          placeholder="mot de passe"
          error={!!errors?.password}
          helperText={errors?.password ? errors.password.message : null}
          required
        ></TextField>
        <TextField
          name="passwordCheck"
          {...register('passwordCheck')}
          type="password"
          variant="standard"
          placeholder="comfirmer votre mot de passe"
          error={!!errors?.passwordCheck}
          helperText={
            errors?.passwordCheck ? errors.passwordCheck.message : null
          }
          required
        ></TextField>
        <Button type="submit" variant="contained">
          Créer un groupe
        </Button>
      </Box>
    </form>
  )
}
