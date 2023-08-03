import { useContext,useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import config from "@/config";
import ArtworkDataContext from "@/context/ArtworkDataContext";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useStateHandler from "@/hooks/useStateHandler";
import fetchWrapper from "@/services/fetchWrapper.service";
import UserService from "@/services/user.service";

/**
 * @note The performance of this hook could be improved by caching indexes of replies. But for simplicity and as i've seen that iterating over 100k thoughts 
 * doesnt take that much time (0.001 seconds desktop, 0.011 seconds phone), i'll keep it simple for now. But when you click reply you could just cache that index
 * so that it wont make a whole search. Might consider this implementation in the future. Not now.
 */
export default function useArtworkThoughts() {
  const { artworkData, socialsData, setSocialsData } = useContext(ArtworkDataContext);
  const { state, cacheHandler } = useStateHandler();
  const [fetchData, setFetchData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [params] = useGetSearchParams({ validParams: ["thought"] });

  useEffect(() => {
    fetchWrapper.get(`${config.apis.api.url}/thought/artwork/${artworkData._id}?limit=10${params?.thought ? `&thought=${params.thought}` : ""}`, {
      injectToken: true
    })
      .then(({ response, data }) => {
        if(response.ok) {
          setLoading(false);
          setFetchData({
            ...data,
            nextThoughtOffset: data.data.length,
            data: data.data.map(thought => ({
              ...thought,
              isLoading: false,
              isSpecial: params?.thought === thought._id,
              hasReplies: thought.children_count ? {
                repliesLeft: thought.children_count,
                nextReplyOffset: 0,
                limit: Math.min(thought.children_count, 10) /** This is very necessary to prevent loading my own replies that i just added! We need to keep track of the original data retrieved */
              } : null
            }))
          });
        }
      });
  }, []);

  async function loadMoreThoughts() {
    const { response, data } = await fetchWrapper.get(`${config.apis.api.url}/thought/artwork/${artworkData._id}?offset=${fetchData.nextThoughtOffset}&limit=10${params?.thought ? `&thought=${params.thought}` : ""}`, {
      injectToken: true
    });

    if(response.ok) {
      setFetchData(prevValue => ({
        ...prevValue,
        nextThoughtOffset: prevValue.nextThoughtOffset + data.data.length,
        data: [
          ...prevValue.data,
          ...data.data.map(thought => ({
            ...thought,
            isLoading: false,
            isSpecial: params?.thought === thought._id,
            hasReplies: thought.children_count ? {
              repliesLeft: thought.children_count,
              nextReplyOffset: 0,
              limit: Math.min(thought.children_count, 10)
            } : null
          }))
        ]
      }));
    }
  }

  async function loadRepliesOfThought(thoughtThatTriggeredThisFunction) {
    const offset = thoughtThatTriggeredThisFunction.hasReplies.nextReplyOffset;
    const limit = thoughtThatTriggeredThisFunction.hasReplies.limit;
    const thoughtParentId = thoughtThatTriggeredThisFunction.thought_parent ? thoughtThatTriggeredThisFunction.thought_parent : thoughtThatTriggeredThisFunction._id;

    const { response, data } = await fetchWrapper.get(`${config.apis.api.url}/thought/replies/${thoughtParentId}?offset=${offset}&limit=${limit}`, {
      injectToken: true
    });

    if(response.ok) {
      setFetchData(prevValue => {
        const copyOfPrevValue = { ...prevValue };
        const indexOfThoughtThatTriggeredThisFunction = copyOfPrevValue.data.findIndex(thought=>thought._id === thoughtThatTriggeredThisFunction._id);
        const newReplies = data.data;
        const oldHasReplies = thoughtThatTriggeredThisFunction.hasReplies;
        const repliesLeft = oldHasReplies.repliesLeft - newReplies.length;
        const newHasReplies = repliesLeft > 0 ? {
          repliesLeft: repliesLeft,
          nextReplyOffset: oldHasReplies.nextReplyOffset + newReplies.length,
          limit: Math.min(repliesLeft, 10) 
        } : null;

        copyOfPrevValue.data[indexOfThoughtThatTriggeredThisFunction].hasReplies = null;
        newReplies[newReplies.length-1].hasReplies = newHasReplies;
        copyOfPrevValue.data.splice(indexOfThoughtThatTriggeredThisFunction+1, 0, ...newReplies);

        return copyOfPrevValue;
      });
    }
  }

  async function publishThought(message, reply) {
    const newThoughtIndex = reply ? getIndexAfterLastReply(reply._id) : 0;
    const thoughtParent = reply ? reply.thought_parent ? reply.thought_parent : reply._id : null;
    const newThought = {
      _id: uuidv4(),
      thought_creator: state.user_session,
      thought_message: message,
      thought_parent: thoughtParent,
      like_count: 0,
      hasReplies: null,
      isSpecial: false,
      isLoading: true
    };

    setFetchData(prevValue => {
      const copyOfPrevValue = { ...prevValue };

      copyOfPrevValue.data.splice(newThoughtIndex, 0, newThought);
      return copyOfPrevValue;
    });

    if(!reply) {
      let scrollableList = document.getElementById(`artwork_${artworkData._id}_thoughts-virtual-list`);

      if(scrollableList) {
        scrollableList.scrollTop = 0;
      }
    }

    const { response, data } = await UserService.publishThought(artworkData._id, message, thoughtParent);

    if(response.ok) {
      setFetchData(prevValue => {
        const copyOfPrevValue = { ...prevValue };
        const indexOfThoughtPublished = (
          copyOfPrevValue.data[newThoughtIndex]._id === newThought._id ? 
            newThoughtIndex 
            : 
            copyOfPrevValue.data.findIndex(thought=>thought._id === newThought._id)
        );

        if(!reply) {
          copyOfPrevValue.totalDocs += 1;
          copyOfPrevValue.nextThoughtOffset += 1;
        }
    
        copyOfPrevValue.data[indexOfThoughtPublished].isLoading = false;
        copyOfPrevValue.data[indexOfThoughtPublished].createdAt = data.createdAt;
        copyOfPrevValue.data[indexOfThoughtPublished]._id = data._id;

        return copyOfPrevValue;
      });

      if(socialsData) {
        setSocialsData(prevValue => ({
          ...prevValue,
          written_thought: true,
          thoughts_count: prevValue.thoughts_count + 1
        }));
      }

      cacheHandler.triggerAction("NEW_THOUGHT");
    }
  }

  function getIndexAfterLastReply(replyId) {
    const replyIndex = fetchData.data.findIndex(thought=>thought._id === replyId);

    for(let i=replyIndex+1; i<fetchData.data.length; i++) {
      if(!fetchData.data[i].thought_parent) {
        return i;
      }
    }

    return fetchData.data.length;
  }

  function onLikeAction(likeStatus, thoughtId) {
    setFetchData(prevValue => ({
      ...prevValue,
      data: prevValue.data.map(thought => {
        if(thought._id === thoughtId) {
          return {
            ...thought,
            like_count: likeStatus ? thought.like_count + 1 : thought.like_count - 1,
          };
        } else {
          return thought;
        }
      })
    }));
  }

  return {
    loading, 
    fetchData, 
    loadMoreThoughts, 
    loadRepliesOfThought, 
    publishThought, 
    onLikeAction,
  };
}