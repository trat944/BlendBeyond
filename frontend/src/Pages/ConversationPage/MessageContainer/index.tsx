import { MessageIndividual } from "../../../interfaces/conversation";
import { getFormattedTime } from "../../../utils/getFormattedTime";
import './message.css'

type Props = {
  msg: MessageIndividual,
  isSender: boolean
}

export const MessageContainer = ({ msg, isSender }: Props) => {
  const formattedTime = getFormattedTime(msg.updatedAt);
  return (
    <div className={isSender ? 'loggedUserSender' : 'targetedUserSender'}>
      <div className="message-content">{msg.message}</div>
      <div className="message-time">{formattedTime}</div>
    </div>
  );
};