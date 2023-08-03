import { useEffect,useState } from 'react';

import XIcon from '@/shared-components/icons/components/public/XIcon';
import Text from '@/shared-components/text/components/Text';

import Suggestions from './suggestions';

import './index.css';

export default function Search({ addTag, formState }) {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [query, setQuery] = useState({ q: "" });

  function handleTagsSuggestions() {
    if(query.q.length > 2) {
      setOpenSuggestions(true);
    } else {
      setOpenSuggestions(false);
    }
  }

  useEffect(() => { 
    handleTagsSuggestions(); 
  }, [query.q]);

  return (
    <>
      <div className="post-tags__search-container">
        <div className="post-tags__search-bar">
          <Text className="post-tags__search-username-entry"large>
                        @
          </Text>

          <input 
            type="text" 
            className="post-tags__search-input" 
            placeholder="Enter username..." 
            autoComplete="off" 
            spellCheck={false} 
            value={query.q} 
            onFocus={handleTagsSuggestions} 
            onBlur={()=>setOpenSuggestions(false)} 
            onInput={(e)=>setQuery({ q: e.target.value })}
          />

          {query.q.length > 0 && <XIcon className="post-tags__delete-input" onClick={()=>setQuery({ q: "" })}/>}
        </div>

        {openSuggestions && (
          <Suggestions
            query={query}
            addTag={addTag}
            formState={formState}
          />
        )}
      </div>
    </>
  );
}
