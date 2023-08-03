import { useEffect,useState } from "react";
import { v4 as uuidv4 } from "uuid";

import config from "@/config";
import fetchWrapper from "@/services/fetchWrapper.service";
import UserService from "@/services/user.service";

import useStateHandler from "./useStateHandler";

export default function useMessages(conversationId) {
  const { state } = useStateHandler();
  const [sendMessageTrigger, setSendMessageTrigger] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [receiveMessageTrigger, setReceiveMessageTrigger] = useState({}); // TODO: WITH WEBSOCKETS
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(messages ? false : true);

  useEffect(() => {
    if(!messages) {
      fetchWrapper.get(`${config.apis.api.url}/order/${conversationId}/chat?limit=25`, {
        injectToken: true
      })
        .then(({ response, data }) => {
          if(response.ok) {
            const newMessages = {
              ...data,
              data: data.data.reverse()
            };

            setLoading(false);
            setMessages(newMessages);
          }
        });
    }
  }, []);

  function loadMoreMessages() {
    fetchWrapper.get(`${config.apis.api.url}/order/${conversationId}/chat?offset=${messages.data.length}&limit=25`, {
      injectToken: true
    }).then(({ response, data }) => {
      if(response.ok) {
        const newMessages = {
          ...messages,
          data: [
            ...data.data.reverse(),
            ...messages.data,
          ]
        };

        setLoading(false);
        setMessages(newMessages);
      }
    });
  }

  function sendMessage(messageText) {
    if(loading) return;

    const messageCreated = {
      _id: uuidv4(),
      message_sender: state.user_session,
      createdAt: Date.now(),
      message_text: messageText
    };

    const newMessages = {
      ...messages,
      totalDocs: messages.totalDocs + 1,
      data: [
        ...messages.data,
        messageCreated
      ]
    };

    setMessages(newMessages);
    setSendMessageTrigger({});

    UserService.sendMessage(conversationId, messageText);
  }

  return { loading, messages, loadMoreMessages, sendMessage, sendMessageTrigger, receiveMessageTrigger };
}