import { useEffect, useMemo,useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from "react-router-dom";

import config from "@/config";
import useIsFirstRender from "@/hooks/useIsFirstRender";
import QuestionsIcon from "@/shared-components/icons/components/public/QuestionsIcon";
import OrderByPopup from '@/shared-components/popups/components/OrderByPopup';
import Text from "@/shared-components/text/components/Text";
import AppNavigationPage from '@/shared-components/wrappers/components/AppNavigationPage';

import FiltersRenderer from "./components/FiltersRenderer";
import Searchbar from "./components/Searchbar";
import PreSearch from "./pre-search";
import SearchFilters from "./search-filters";
import SearchResults from "./search-results";

import './index.css';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(location.state ? location.state : { sort: config.search.main_search.artwork_order_by[0] });
  const [openFilters, setOpenFilters] = useState(false);
  const isFirstRender = useIsFirstRender();
  const isPreSearch = useMemo(() => (
    Object.keys(query).filter(key => {
      if(key !== "sort" && query[key]) {
        if(Array.isArray(query[key])) { 
          return query[key].length > 0;
        } else {
          return true;
        }
      } else return false;
    }).length === 0
  ), [query]);

  useEffect(() => {
    /** Previously i used search params to store the query data (in order to restore it when we enter again to the search paage) 
         * but the url got way too long. That's why we will store it in the state of the url. The user will have a very short url (readable) */
    if(!isFirstRender) { 
      navigate("/search", { state: query, replace: true });
    }
  }, [query]);

  useEffect(()=>{
    setTimeout(() => {
      document.body.classList.add("search-scrollbar");
    }, 50); /** Timeout prevents scrollbar from appearing on init */

    return () => {
      document.body.classList.remove("search-scrollbar");
    };
  }, []);

  return (
    <>
      <Helmet> 
        <title>Search - Suarte</title>
        <meta name="description" content="Explore the finest artworks from the best galleries and artists around the world in Suarte. Use a wide range of filters and find your ideal artwork for your collection" />
      </Helmet>
      <AppNavigationPage>
        <div className="search__page">
          <div className="search__filters">
            <SearchFilters 
              query={query} 
              setQuery={setQuery} 
              open={openFilters} 
              close={()=>setOpenFilters(false)}
            />
          </div>

          <main className="search__main">
            <div className="search__sticky-main">
              <Searchbar query={query} setQuery={setQuery}/>

              <div className={`search__options-container element-non-selectable ${isPreSearch ? "pre" : ""}`}>
                <Text className="search__option" small onClick={()=>setOpenFilters(true)}>
                                    Artwork filters <QuestionsIcon/>
                </Text>

                {!isPreSearch && (
                  <OrderByPopup 
                    onChangeOption={(option)=>setQuery({ ...query, sort: option })} 
                    defaultOption={query.sort} 
                    options={config.search.main_search.artwork_order_by}
                  />
                )}
              </div>

              <FiltersRenderer 
                query={query} 
                setQuery={setQuery} 
                exceptions={["sort", "q"]}
              />
            </div>

            {
              isPreSearch ? 
                <PreSearch/> 
                : 
                <SearchResults query={query}/>
            }
          </main>
        </div>
      </AppNavigationPage>
    </>
  );
}
