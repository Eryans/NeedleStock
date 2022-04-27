import Textfield from "@mui/material/TextField";
import BoxCenter from "../../customComponents/BoxCenter";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { flexbox } from "@mui/system";
import * as yup from "yup";

export default function LoginPage() {

    const validationSchema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required()
    }).required()
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
      resolver: validationSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
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
        <Button type="submit">Connexion</Button>
      </form>
    </BoxCenter>
  );
}
