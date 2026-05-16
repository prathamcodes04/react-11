import RobotProfileImage from '../assets/robot-image.png';
import UserProfileImage from '../assets/user-image.png';
import LoadingProfileGif from '../assets/loading_gray.gif'; 

export function ChatMessage({ message, sender, isLoading }) {

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {isLoading  ? (<img src={LoadingProfileGif} className="loading-gif"/>)
          : (message)
        }
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}