import { useState, useEffect } from "react";
import { getItems, registerItem } from "../axios/items_action";
import { getUserGroup, setGroup } from "../axios/group_action";
import BoxCenter from "../customComponents/BoxCenter";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";

export default function HomePage() {
  const validationSchema = yup.object({
      name: yup.string().required(),
      password: yup.string().required(),
      passwordCheck: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      password: "",
      passwordCheck: ""
    },
  });

  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage["user"]);
    if (!currentUser) {
      console.log("vous n'êtes pas connecté");
    } else {
      console.log(currentUser);
    }
    return new Promise((resolve) => {
      getUserGroup({ id: currentUser.id }).then((res) => {
        console.log(res);
        setGroups(res.groups);
        resolve();
      });
    });
  }, []);

  const onSubmit = (values) => {
    const currentUser = JSON.parse(localStorage["user"]);

    return new Promise((resolve) => {
      try {
        setGroup({values, id:currentUser.id}).then((res) => {
          console.log(res)
        })
        resolve();
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <>
      <BoxCenter>
        <h1>Home Page</h1>
        {items.length > 0 && (
          <ul>
            {items.map((x, i) => {
              return <li key={`${x.name}/${i}`}>{x.name}</li>;
            })}
          </ul>
        )}
        {groups.length <= 0 ? (
          <>
            <p>
              Il semblerait que vous n'ayez pas encore de groupe, créer en un si
              dessous &#128515;
            </p>
            <br></br>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2em",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2em",
                  width: "50%",
                }}
              >
                <TextField
                  name="name"
                  {...register("name")}
                  type="text"
                  variant="standard"
                  placeholder="Nom du groupe"
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                  required
                ></TextField>
                <TextField
                  name="password"
                  {...register("password")}
                  type="password"
                  variant="standard"
                  placeholder="mot de passe"
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                  required
                ></TextField>
                <TextField
                  name="passwordCheck"
                  {...register("passwordCheck")}
                  type="password"
                  variant="standard"
                  placeholder="comfirmer votre mot de passe"
                  error={!!errors?.passwordCheck}
                  helperText={
                    errors?.passwordCheck ? errors.passwordCheck.message : null
                  }
                  required
                ></TextField>
                <Button type="submit" variant="contained">Créer votre groupe</Button>
              </Box>
            </form>
          </>
        ) : (
          <h2>Do something</h2>
        )}
      </BoxCenter>
    </>
  );
}
