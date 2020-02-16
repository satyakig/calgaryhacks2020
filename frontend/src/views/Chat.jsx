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
    getDb()
      .collection(`chat${user.selectedCourses[room]}`)
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
  }, [room, user.selectedCourses]);

  function addMessage(event) {
    const message = event.message;
    message.timestamp = moment(message.timestamp).valueOf();

    getDb()
      .collection(`chat${user.selectedCourses[room]}`)
      .add(message)
      .then();
  }

  const userId = {
    id: user.uid,
    name: user.name,
    avatarUrl: 'https://via.placeholder.com/24/008000/008000.png',
  };

  return (
    <div style={{ padding: '10px' }}>
      <Tabs activeKey={room} defaultActiveKey={0} onSelect={handleSelect}>
        {user.selectedCourses.map((course, index) => {
          return (
            <Tab eventKey={index} title={course} key={index}>
              <Chat user={userId} messages={chats} onMessageSend={addMessage} />
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ChatRoom;
