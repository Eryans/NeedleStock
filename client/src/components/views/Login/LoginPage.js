import Textfield from "@mui/material/TextField";
import BoxCenter from "../../customComponents/BoxCenter";
import { useForm } from "react-hook-form";
import { Alert, Button, Link } from "@mui/material";
import { loginUser } from "../../axios/user_action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigator = useNavigate();
  const {state} = useLocation();
  const {notAuth} = state;
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
    user && user.isLogged && navigator("/");
  }, [user]);
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      try {
        loginUser(values).then((res) => {
          const userInfo = {
            id: res._id,
            name: res.name,
            email: res.email,
            token: res.token,
            groups: res.groups,
            isLogged: true,
          };
          setUser(userInfo);
          localStorage["user"] = JSON.stringify(userInfo);
          resolve();
        });
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <BoxCenter>
      {notAuth && <Alert severity="error">{notAuth}</Alert>}
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
          Cr??er un compte
        </Link>
      </form>
    </BoxCenter>
  );
}
