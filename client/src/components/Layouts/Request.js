import { Button, Box, Select, MenuItem, Input } from "@mui/material";
import { getThemeProps } from "@mui/system";
import { useEffect, useState } from "react";
import { getSingleGroup } from "../axios/group_action";
import { getSingleItem } from "../axios/items_action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function Request(props) {
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

  const [requestForm, setRequestForm] = useState(false);
  const [items, setItems] = useState(props.currentGroup.items);
  const [selectorValue, setSelectorValue] = useState("");
  const [selectorNumber, setSelectorNumber] = useState([]);

  const handleChange = (e) => {
    setSelectorValue(e.target.value);
  };
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
    fetchItems();
  }, [props.currentGroup]);

  return (
    <Box mt={5}>
      <Button
        variant="contained"
        onClick={() => {
          setRequestForm(true);
          let newField = {};
          setSelectorNumber([...selectorNumber, newField]);
        }}
      >
        Créer une nouvelle Requête
      </Button>
      {requestForm ? (
        <form>
          {selectorNumber.map(() => {
            return <>
              <Select
                id="item-Selector"
                labelId="itemSelector"
                label="Selectionner un objet"
                value={selectorValue}
                onChange={handleChange}
              >
                {items.map((item, i) => {
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
            </>;
          })}
        </form>
      ) : (
        <></>
      )}
    </Box>
  );
}
