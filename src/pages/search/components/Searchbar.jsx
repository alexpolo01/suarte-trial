import SearchNavbarIcon from '@/shared-components/icons/components/navigation/SearchNavbarIcon';
import XIcon from '@/shared-components/icons/components/public/XIcon';

import './styles/Searchbar.css';

export default function Searchbar({ query, setQuery }) {
  return (
    <>
      <div className="searchbar__container">
        <SearchNavbarIcon className="searchbar__icon"/>

        <input 
          type="text" 
          className="searchbar__input" 
          value={query.q ? query.q : ""} 
          onInput={(e)=>setQuery({ ...query, q: e.target.value })} 
          placeholder="Search for artworks..." 
          spellCheck={false} autoComplete="off"
        />

        {query.q && <XIcon className="searchbar__clear" onClick={()=>setQuery({ ...query, q: "" })}/>}
      </div>
    </>
  );
}
