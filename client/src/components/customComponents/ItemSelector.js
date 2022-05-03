import { Button, Box, Select, MenuItem, Input } from "@mui/material";
import { getThemeProps } from "@mui/system";
import { useEffect, useState } from "react";
import { getSingleGroup } from "../axios/group_action";
import { getSingleItem } from "../axios/items_action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function ItemSelector(props) {
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

  const [selectorValue, setSelectorValue] = useState("");

  const handleChange = (e) => {
    setSelectorValue(e.target.value);
  };

  return (
    <Box data-selector-key>
      <Select
        id="item-Selector"
        labelId="itemSelector"
        label="Selectionner un objet"
        value={selectorValue}
        onChange={handleChange}
      >
        {props.items.map((item, i) => {
          return (
            <MenuItem key={`${item}/${i}`} value={item._id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
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
    </Box>
  );
}
