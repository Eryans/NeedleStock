import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addGroupitems } from "../axios/group_action";
import { TextField, Button, Input, Box } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerItem,updateItem } from "../axios/items_action";

export default function ItemForm(props) {
  const [customFieldsnbr, setCustomFieldsNbr] = useState([]);

  const validationSchema = yup
    .object({
      name: yup.string().required(),
      quantity: yup.number().required(),
      content: yup.string(),
      value: yup.string(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const addRow = () => {
    let newField = {};
    setCustomFieldsNbr([...customFieldsnbr, newField]);
  };

  const delRow = async (e) => {
    setCustomFieldsNbr((prev) => {
      const next = [...prev];
      next.pop();
      return next;
    });
  };
  const onUpdateSubmit = async (values) => {
    console.log(props.selectedItem);
    let customF = document.querySelectorAll("[data-key]");
    let customFieldsArray = Array.from(customF).map((field) => {
      let customObject = {
        name: field.childNodes[0].firstChild.firstChild.value,
        content: field.childNodes[1].firstChild.firstChild.value,
        // MUI makes it a pain to get data
      };
      return customObject;
    });
    
    const newBody = {
      id:props.selectedItem._id,
      name: values.name,
      quantity: values.quantity,
      customFields: customFieldsArray,
    };
    console.log(customFieldsArray);
    updateItem(newBody).then((res)=>{
      try {
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    })
  };
  const onSubmit = async (values) => {
    return new Promise((resolve) => {
      try {
        let customF = document.querySelectorAll("[data-key]");
        let customFieldsArray = Array.from(customF).map((field) => {
          let customObject = {
            name: field.childNodes[0].firstChild.firstChild.value,
            content: field.childNodes[1].firstChild.firstChild.value,
            // MUI is a pain to get data
          };
          return customObject;
        });
        const newBody = {
          name: values.name,
          quantity: values.quantity,
          customFields: customFieldsArray,
        };
        registerItem(newBody).then((res) => {
          addGroupitems({ item: res, groupId: props.currentGroup._id }).then(
            (response) => {
              props.setCurrentGroup(response);
            }
          );
          resolve();
        });
      } catch (err) {}
    });
  };

  const handleChange = (e) => {
    props.setSelectedItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return !props.isUpdate ? (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2em",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <Input
        name="quantity"
        {...register("quantity")}
        type="number"
        variant="standard"
        placeholder="Quantité"
        error={!!errors?.quantity}
        helpertext={errors?.quantity ? errors.quantity.message : null}
        required
      ></Input>
      {customFieldsnbr.length > 0 && (
        <Button onClick={delRow}>Retirer une valeur</Button>
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
              helpertext={errors?.content ? errors.content.message : null}
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
        );
      })}
      <Button onClick={addRow}>Ajouter une valeur</Button>
      <Button type="submit">Créer un objet</Button>
    </form>
  ) : (
    <form onSubmit={handleSubmit(onUpdateSubmit)}>
      <TextField
        name="name"
        {...register("name")}
        type="text"
        variant="standard"
        placeholder="Nom"
        error={!!errors?.name}
        helpertext={errors?.name ? errors.name.message : null}
        required
        value={props.selectedItem.name}
        onChange={handleChange}
      ></TextField>
      <Input
        name="quantity"
        {...register("quantity")}
        type="number"
        variant="standard"
        placeholder="Quantité"
        error={!!errors?.quantity}
        helpertext={errors?.quantity ? errors.quantity.message : null}
        required
        value={props.selectedItem.quantity}
        onChange={handleChange}
      ></Input>
      {props.selectedItem.customFields.length > 0 &&
        props.selectedItem.customFields.map((field, i) => {
          return (
            <Box key={`fieldBox${i}`} data-key={`fieldBox${i}`}>
              <TextField
                name={`content${i}`}
                id={`content${i}`}
                type="text"
                variant="standard"
                placeholder="Contenu"
                error={!!errors?.content}
                helpertext={errors?.content ? errors.content.message : null}
                required
                defaultValue={field.name}
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
                defaultValue={field.content}
                key={`keyValue${i}`}
              ></TextField>
            </Box>
          );
        })}
      {customFieldsnbr.length > 0 && (
        <Button onClick={delRow}>Retirer une valeur</Button>
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
              helpertext={errors?.content ? errors.content.message : null}
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
        );
      })}
      <Button onClick={addRow}>Ajouter une valeur</Button>
      <Button type="submit">Send</Button>
    </form>
  );
}
