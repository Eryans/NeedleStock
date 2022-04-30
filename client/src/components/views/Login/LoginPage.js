import Textfield from "@mui/material/TextField";
import BoxCenter from "../../customComponents/BoxCenter";
import { useForm } from "react-hook-form";
import { Button, Link } from "@mui/material";
import { loginUser } from "../../axios/user_action";
import { flexbox } from "@mui/system";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

export default function LoginPage() {
  const validationSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    console.log(localStorage.getItem('token'))
  })
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      try {
        loginUser(values).then((res) => {
          console.log(res);
          localStorage["user"] = res.name
          localStorage.setItem('token',res.token)
          console.log(localStorage["user"])
          resolve();
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <BoxCenter>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "2em" }}
      >
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
        <Button type="submit" variant="contained">
          Connexion
        </Button>
        <Link href="/register" component={Button} variant="contained">
          Créer un compte
        </Link>
      </form>
    </BoxCenter>
  );
}
