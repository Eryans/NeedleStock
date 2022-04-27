import Textfield from "@mui/material/TextField";
import BoxCenter from "../../customComponents/BoxCenter";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../axios/user_action";
import { useState } from "react";
export default function RegisterPage() {
  const [message, setMessage] = useState();

  const validationSchema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    console.log("hello");
    return new Promise((resolve, reject) => {
      try {
        registerUser(values).then((res) => {
          console.log(res);
          setMessage(res);
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

        {/* {message && <Box mt={2}>{message}</Box>} */}
      </form>
    </BoxCenter>
  );
}
