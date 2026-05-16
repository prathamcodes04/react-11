import dayjs from 'dayjs';
import RobotProfileImage from '../assets/robot-image.png';
import UserProfileImage from '../assets/user-image.png';
import LoadingProfileGif from '../assets/loading_gray.gif'; 
import './ChatMessage.css';


export function ChatMessage({ message, sender, isLoading, time }) {

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
            : (
                <>
                    <div>{message}</div>

                    <div className="message-time">
                        {dayjs(time).format('h:mm A')}
                    </div>
                </>
            )
        }
        </div>

        {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
        )}
    </div>
    );
}