import React, { useState, useContext, useEffect } from 'react';

import { itemMethods, IItem, ItemStatus } from '../../firebase/data/items';

import { IMessage } from '../common/Message';

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
  items: IItem[],
  addItem: (name: string, status: ItemStatus) => void,
  editItem: (newName: string, newStatus: ItemStatus, id: string) => void,
  deleteItem: (id: string) => void,
  message: IMessage | null,
  closeMessage: () => void
}

const initialState = {
  items: [],
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
  const [items, setItems] = useState<IItem[]>([])
  const [message, setMessage] = useState<IMessage | null>(initialState.message)

  const fetchItems = async () => {
    const data = await itemMethods.getItems();
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
  }, [])

  useEffect(() => {
    const handleAddItem = (name: string, id: string) => {
      const newItems = items.map(item => {
        if (item.name === name) {
          return {
            ...item,
            id
          }
        } else {
          return item
        }
      })
  
      setItems(newItems)
    }

    for (let item of items) {
      if (!item.id) {
        itemMethods.addItem(item.name, item.status, handleAddItem)
      }
    }
  }, [items]);


  const addItem = (name: string, status: ItemStatus) => {
    if (items.some(item => item.name === name)) {
      setMessage({
        text: `Whoops, you already have an item called ${name}.`,
        type: 'info'
      })
    } else {
      setItems([{ name, created: new Date(), status }, ...items])
    }
  }

  const editItem = (newName: string, newStatus: ItemStatus, id: string) => {
    if (items.some(item => item.name === newName)) {
      setMessage({
        text: `Whoops, you already have an item called ${newName}.`,
        type: 'info'
      })
    } else {
      itemMethods.editItem(newName, newStatus, id);

      const newItems = items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            name: newName,
            status: newStatus
          }
        } else {
          return item
        }
      })

      setItems(newItems)
    }
  }

  const deleteItem = (id: string) => {
    itemMethods.deleteItem(id);
    
    const newItems = [...items];
    newItems.splice(newItems.findIndex(i => i.id === id), 1);

    setItems(newItems);
  }

  const closeMessage = () => {
    setMessage(null)
  }


  return (
    <ItemContext.Provider
      value={{
        items,
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
