import React, { useState, useContext, useEffect } from 'react';

import { ItemMethods, IItem } from './firebase/data/items';

import { IMessage } from './components/common/Message';

interface IInputs {
  email: string,
  password: string,
}

interface IUser {
  displayName: string,
  email: string,
  photoURL: string,
  emailVerified: boolean,
  uid: string,
}

export interface IItemContext {
  Items: IItem[],
  addItem: (label: string) => void,
  editItem: (newLabel: string, id: string) => void,
  deleteItem: (id: string) => void,
  message: IMessage | null,
  closeMessage: () => void
}

const initialState = {
  Items: [],
  addItem: () => {},
  editItem: () => {},
  deleteItem:  () => {},
  message: null,
  closeMessage: () => {}
}

export const ItemContext = React.createContext<IItemContext>(initialState);

interface ItemProviderProps {
  children: React.ReactNode
}

const ItemProvider: React.FC<ItemProviderProps> = props => {
  const [Items, setItems] = useState<IItem[]>([])
  const [message, setMessage] = useState<IMessage | null>(initialState.message)

  const fetchItems = async () => {
    const data = await ItemMethods.getItems();
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
  }, [])

  useEffect(() => {
    const handleAddItem = (label: string, id: string) => {
      const newItems = Items.map(Item => {
        if (Item.label === label) {
          return {
            ...Item,
            id
          }
        } else {
          return Item
        }
      })
  
      setItems(newItems)
    }

    for (let Item of Items) {
      if (!Item.id) {
        ItemMethods.addItem(Item.label, handleAddItem)
      }
    }
  }, [Items]);


  const addItem = (label: string) => {
    if (Items.some(Item => Item.label === label)) {
      setMessage({
        text: `Whoops, you already have an Item called ${label}.`,
        type: 'info'
      })
    } else {
      setItems([{ label, created: new Date() }, ...Items])
    }
  }

  const editItem = (newLabel: string, id: string) => {
    if (Items.some(Item => Item.label === newLabel)) {
      setMessage({
        text: `Whoops, you already have an Item called ${newLabel}.`,
        type: 'info'
      })
    } else {
      ItemMethods.editItem(newLabel, id);

      const newItems = Items.map(Item => {
        if (Item.id === id) {
          return {
            ...Item,
            label: newLabel
          }
        } else {
          return Item
        }
      })

      setItems(newItems)
    }
  }

  const deleteItem = (id: string) => {
    ItemMethods.deleteItem(id);
    
    const newItems = [...Items];
    newItems.splice(newItems.findIndex(i => i.id === id), 1);

    setItems(newItems);
  }

  const closeMessage = () => {
    setMessage(null)
  }


  return (
    <ItemContext.Provider
      value={{
        Items,
        addItem,
        editItem,
        deleteItem,

        message,
        closeMessage
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemContext)
}

export default ItemProvider;
