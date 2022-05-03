import { TextField, Button, Box, Select, MenuItem, Input } from "@mui/material";
import { getThemeProps } from "@mui/system";
import { useEffect, useState } from "react";
import { addGroupRequest, getSingleGroup } from "../axios/group_action";
import { getSingleItem, updateItemQuantity } from "../axios/items_action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ItemSelector from "../customComponents/ItemSelector";
import { registerRequest, getGroupRequests } from "../axios/request_action";

export default function Request(props) {
  const validationSchema = yup
    .object({
      name: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [requestForm, setRequestForm] = useState(false);
  const [items, setItems] = useState(props.currentGroup.items);
  const [selectorNumber, setSelectorNumber] = useState([]);
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("")
  const onSubmit = (values) => {
    return new Promise((resolve) => {
      try {
        let input = document.querySelectorAll("[data-selector-key]");
        let selectorValues = Array.from(input).map((item) => {
          let customObject = {
            item: item.childNodes[0].childNodes[1].defaultValue,
            quantityToChange: item.childNodes[1].firstChild.value,
            // MUI is REALLY a pain to get data
          };
          return customObject;
        });
        let Request = {
          name: values.name,
          actions: selectorValues,
          group: props.currentGroup._id,
        };
        console.log(Request);
        registerRequest(Request).then((res) => {
          addGroupRequest({ group: props.currentGroup, request: res }).then(
            (response) => {
              console.log(response);
            }
          );
          console.log(res);
          resolve();
        });
      } catch (error) {}
    });
  };

  const executeRequest = (request) =>{
    request.actions.forEach(action => {
      console.log(action)
      updateItemQuantity({item:action.item,quantity:action.quantityToChange,requestObj:request}).then(res => {
        console.log(res)
        setMessage(res.message)
      })
    })
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        getSingleGroup({ id: props.currentGroup._id }).then((res) => {
          setItems([]); // Empty State before filling it again to avoid double
          res.items.map(async (item) => {
            const response = await getSingleItem({ _id: item });
            setItems((items) => [...items, response]);
          });
        });
      } catch (err) {}
    };
    const fetchRequest = async () => {
      getGroupRequests({ groupId: props.currentGroup._id }).then((res) => {
        setRequests(res);
      });
    };
    fetchRequest();
    fetchItems();
  }, [props.currentGroup,message]);

  return (
    <Box mt={5}>
      {message &&
      <h3>{message}</h3>}
      <Button
        variant="contained"
        onClick={() => {
          setRequestForm(true);
        }}
      >
        Créer une nouvelle Requête
      </Button>
      {requestForm ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="name"
            {...register("name")}
            type="text"
            variant="standard"
            placeholder="Nom"
            error={!!errors?.name}
            helpertext={errors?.name ? errors.name.message : null}
            required
          ></TextField>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ItemSelector items={items} />
            {selectorNumber.length > 0 &&
              selectorNumber.map((x, i) => {
                return <ItemSelector items={items} key={`Selector${i}`} />;
              })}
          </Box>
          <Button
            onClick={() => {
              let newField = {};
              setSelectorNumber([...selectorNumber, newField]);
            }}
          >
            rajouter une entrée
          </Button>
          <Button type="submit">Envoyer</Button>
        </form>
      ) : (
        <></>
      )}
      {requestForm ? (
        <></>
      ) : (
        <Box sx={{display:"flex",flexDirection:"column",gap:"1em"}} mt={4}>
          {requests.map((request) => {
            return <Button variant="contained" onClick={() => executeRequest(request)}>{request.name}</Button>;
          })}
        </Box>
      )}
    </Box>
  );
}
