import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BoxCenter from "../customComponents/BoxCenter";
import Groups from "../Layouts/Groups";
import {
  getSingleGroup,
  updateGroup,
  updateGroupitems,
} from "../axios/group_action";
import { TextField, Button, Input, Box } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getItems, getSingleItem, registerItem } from "../axios/items_action";
import ItemForm from "../customComponents/ItemForm";

export default function Items(props) {
  const [items, setItems] = useState([]);

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
    defaultValues: {
      name: "",
      quantity: 0,
    },
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        getSingleGroup({ id: props.currentGroup._id }).then((res) => {
          setItems([]); // Empty State before filling it again to avoid double
          res.items.map((item, index) => {
            getSingleItem({ _id: item }).then((response) => {
              setItems((items) => [...items, response]);
            });
          });
        });
      } catch (err) {}
    };
    fetchItems();
  }, [props.currentGroup]);
  return (
    <>
      <ul>
        {items.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={`${item._id}`}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>Pas encore d'object enregistrés</div>
        )}
      </ul>
      <ItemForm currentGroup={props.currentGroup} setCurrentGroup={props.setCurrentGroup} />
    </>
  );
}
