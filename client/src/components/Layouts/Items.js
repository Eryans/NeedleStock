import { Alert, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getSingleGroup, deleteGroupItem } from "../axios/group_action";
import { getSingleItem, deleteItem } from "../axios/items_action";
import ItemForm from "../customComponents/ItemForm";

export default function Items(props) {
  const [items, setItems] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [formDefValues, setFormDefValues] = useState();

  const updateItem = (item) => {
    setFormDefValues(item);
    setSelectedItem(item);
    setUpdateForm(true);
  };
  const deleteSelectedItem = (itemId) => {
    try {
      deleteGroupItem({ groupId: props.currentGroup._id }).then((response) => {
        deleteItem({ id: itemId }).then((res) => {
          props.setCurrentGroup(response);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const upgradeQuantity = (item) => {};
  const lowerQuantity = (item) => {};

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
    <>
      {items.length > 0 && (
        <>
          {items.map((item) => {
            if (item.minimumAlert > item.quantity) {
              return (
                <Alert severity="error">{`Attention, il ne reste que ${item.quantity} unités de ${item.name} !`}</Alert>
              );
            }
            return <></>
          })}
        </>
      )}
      <ul>
        {items.length > 0 ? (
          !updateForm ? (
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
                      <td>
                        <Button onClick={() => lowerQuantity(item)}>-</Button>
                        {item.quantity}
                        <Button onClick={() => upgradeQuantity(item)}>+</Button>
                      </td>
                      <td>
                        <Button onClick={() => updateItem(item)}>
                          Modifier
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() => deleteSelectedItem(item._id)}>
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <ItemForm
              isUpdate={true}
              currentGroup={props.currentGroup}
              setCurrentGroup={props.setCurrentGroup}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            ></ItemForm>
          )
        ) : (
          <div>Pas encore d'object enregistrés</div>
        )}
      </ul>
      {!updateForm && (
        <ItemForm
          isUpdate={false}
          currentGroup={props.currentGroup}
          setCurrentGroup={props.setCurrentGroup}
        />
      )}
    </>
  );
}
