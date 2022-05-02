import Textfield from "@mui/material/TextField";
import BoxCenter from "../../customComponents/BoxCenter";
import { useForm } from "react-hook-form";
import { Button, Link } from "@mui/material";
import { Box} from "@mui/system";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../axios/user_action";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterPage() {
  const [message, setMessage] = useState();
  const { setUser } = useContext(AuthContext)

  const validationSchema = yup
    .object({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    return new Promise((resolve, reject) => {
      try {
        registerUser(values).then((res) => {
          setMessage(res.message);
          setUser(values)
          localStorage['user'] = JSON.stringify(values)
          navigator('/')
          resolve();
        });
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <BoxCenter>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "2em"}}
      >
        <Textfield
          name="username"
          {...register("username")}
          type="text"
          variant="standard"
          placeholder="username"
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
          required
        ></Textfield>
        <Textfield
          name="email"
          {...register("email")}
          type="email"
          variant="standard"
          placeholder="email"
          error={!!errors?.email}
          helperText={errors?.email ? errors.email.message : null}
          required
        ></Textfield>
        <Textfield
          name="password"
          {...register("password")}
          type="password"
          variant="standard"
          placeholder="password"
          required
        ></Textfield>
        <Button type="submit">Inscription</Button>

        {message && 
        <>
        <Box mt={2}>{message}</Box>
        <Link href="/login" component={Button} variant="contained">Retourner à l'écran de connexion</Link>
        </>
        }
      </form>
    </BoxCenter>
  );
}
