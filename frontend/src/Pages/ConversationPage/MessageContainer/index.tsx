import { MessageIndividual } from "../../../interfaces/conversation";
import './message.css'

type Props = {
  msg: MessageIndividual,
  isSender: boolean
}

export const MessageContainer = ({ msg, isSender }: Props) => {
  return (
    <div className={isSender ? 'loggedUserSender' : 'targetedUserSender'}>
      {msg.message}
      {/* Aquí poner fecha y hora */}
    </div>
  );
};