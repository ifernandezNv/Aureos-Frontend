import { Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { View, Text, StyleSheet } from 'react-native';

function ChatPersonal({route}) {
  
    return (
        <Channel
            channel={route?.channel}
        >
            {/* <MessageList/>
            <MessageInput/> */}
        </Channel>
    )
}


export default ChatPersonal