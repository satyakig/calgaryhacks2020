import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Chat } from '@progress/kendo-react-conversational-ui';
import moment from 'moment';
import { getDb } from '../lib/Firebase';

const ChatRoom = () => {
  const [room, setRoom] = useState(0);
  const [chats, setChats] = useState([]);

  const user = useSelector((state) => {
    return state.userReducer;
  });

  function handleSelect(index) {
    setRoom(index);
  }

  useEffect(() => {
    const roomName = user.selectedCourses[room - 1];

    if (room === 0 || roomName === undefined) {
      setChats([]);
    } else {
      getDb()
        .collection(`chat${roomName}`)
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            let messages = [];
            snapshot.forEach((doc) => {
              messages.push(doc.data());
            });

            messages = messages
              .map((message) => {
                return {
                  ...message,
                  timestamp: moment(message.timestamp).toDate(),
                };
              })
              .sort((message1, message2) => {
                return message1.timestamp - message2.timestamp;
              });

            setChats(messages);
          } else {
            setChats([]);
          }
        });
    }
  }, [room, user.selectedCourses]);

  function addMessage(event) {
    const roomName = user.selectedCourses[room - 1];

    if (room !== 0 && roomName !== undefined) {
      const message = event.message;
      message.timestamp = moment(message.timestamp).valueOf();

      getDb()
        .collection(`chat${roomName}`)
        .add(message)
        .then();
    }
  }

  const userId = {
    id: user.uid,
    name: user.name,
    avatarUrl: user.avatarUrl,
  };

  return (
    <div style={{ padding: '10px' }}>
      <Tabs activeKey={room} defaultActiveKey={0} onSelect={handleSelect} id="Tabs">
        <Tab eventKey={0} title="Bot">
          <iframe
            title="Bot"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/5d4b04ff-b9aa-4487-8dcc-015c6293b00d"
            style={{
              position: 'relative',
              height: '600px',
              display: 'flex',
              flexDirection: 'column',
              width: '500px',
              maxWidth: '90vw',
              margin: 'auto',
            }}
          />
        </Tab>

        {user.selectedCourses.map((course, index) => {
          return (
            <Tab eventKey={index + 1} title={course} key={index}>
              <Chat user={userId} messages={chats} onMessageSend={addMessage} />
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ChatRoom;
