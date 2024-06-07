import { useRef } from "react";
import { MessageIndividual } from "../../../interfaces/conversation";
import { getFormattedTime } from "../../../utils/getFormattedTime";
import './message.css'
import { MessageOptionsMenu } from "./MessageOptionsMenu";
import { useCalculateMenuPosition } from "../../../hooks/useCalculateMenuPosition";
import { useClickOutside } from "../../../hooks/useClickOutsideMessageMenu";

type Props = {
  msg: MessageIndividual,
  receiverId: string,
  isSender: boolean,
  currentOpenMenu: string | null,
  setCurrentOpenMenu: (id: string | null) => void;
}

export const MessageContainer = ({ msg, isSender, currentOpenMenu, setCurrentOpenMenu, receiverId }: Props) => {
  const formattedTime = getFormattedTime(msg.updatedAt);
  const messageRef = useRef<HTMLDivElement>(null);
  const { menuRef, setClickPosition, calculateMenuPosition } = useCalculateMenuPosition({ x: 0, y: 0 });
  const isMenuOpen = currentOpenMenu === msg.id;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setClickPosition({ x: clientX, y: clientY });
    setCurrentOpenMenu(msg.id);
  };

  useClickOutside(menuRef, () => setCurrentOpenMenu(null), isMenuOpen);

  return (
    <>
      <div onClick={handleClick} className={isSender ? 'loggedUserSender' : 'targetedUserSender'} ref={messageRef}>
        <div className="message-content">{msg.message}</div>
        <div className="message-time">{formattedTime}</div>
      </div>
      {isMenuOpen && (
        <div ref={menuRef} style={calculateMenuPosition()}>
          <MessageOptionsMenu msg={msg} receiverId={receiverId} />
        </div>
      )}
    </>
  );
};