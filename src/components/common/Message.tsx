import React from 'react';

import { IonNote } from '@ionic/react';

import './common.css';

export type MessageType = 'info' | 'warning' | 'error';

export interface IMessage {
  text: string,
  type: MessageType
}

interface MessageProps {
  message: IMessage | null,
  onClose: () => void
}

const Message: React.FC<MessageProps> = ({ message, onClose }) => {

  return (
    <IonNote className="message" color="primary">
      {message ? message.text : <br />}
    </IonNote>
  )
}

export default Message;
