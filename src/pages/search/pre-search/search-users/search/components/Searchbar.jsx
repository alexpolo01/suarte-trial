import SearchNavbarIcon from '@/shared-components/icons/components/navigation/SearchNavbarIcon';

import './styles/Searchbar.css';

export default function Searchbar({ query, setQuery }) {
  return (
    <>
      <div className="search-users-search-bar__outter">
        <div className="search-users-search-bar__container">
          <SearchNavbarIcon className="search-users-search-bar__search-icon"/>

          <input 
            type="text" 
            className="search-users-search-bar__search-input" 
            onInput={e=>setQuery({ ...query, q: e.target.value })} 
            placeholder="Search by name or username..." 
            spellCheck={false} 
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
}
