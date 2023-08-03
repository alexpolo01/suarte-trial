import { useEffect,useMemo, useState } from 'react';

import useIsFirstRender from '@/hooks/useIsFirstRender';

import Text from './Text';

import './styles/TextHandler.scss';

export default function TextHandler({ className="", controlsClassName="", text="", maxLinesWhenCollapsed=null, maxCharactersWhenCollapsed=150, collapsable=false, respectLinesLayout=false, moreControlClick=null, onExpand=null, onCollapse=null, isExpandedOnInit=false, extraSmall=false, small=false, medium=false, large=false }) {
  const [mode, setMode] = useState(isExpandedOnInit ? "expanded" : "collapsed");
  const collapsedText = useMemo(() => getCollapsedText(text), [maxCharactersWhenCollapsed, maxLinesWhenCollapsed, text]);
  const isFirstRender = useIsFirstRender();
  const expandedText = text;

  useEffect(() => {
    if(!isFirstRender) {
      if(mode === "collapsed" && onCollapse) onCollapse();
      else if(onExpand) onExpand();
    }
  }, [mode]);

  function getCollapsedText(textToCollapse) {
    let newCollapsedText = maxLinesWhenCollapsed ? textToCollapse.split("\n").slice(0, maxLinesWhenCollapsed).join("\n") : textToCollapse;
    if (newCollapsedText.length > maxCharactersWhenCollapsed) {
      newCollapsedText = newCollapsedText.slice(0, maxCharactersWhenCollapsed);
    }
    if(newCollapsedText.length < textToCollapse.length) return `${newCollapsedText}...`;
    else return newCollapsedText;
  }

  if(!text || text === "") {
    return (
      <></>
    );
  } else {
    return (
      <>
        <div className={`${className}`}>
          <Text 
            className={`${respectLinesLayout ? "text-handler__text-container-preline" : ""}`} 
            extraSmall={extraSmall} 
            small={small} 
            medium={medium} 
            large={large}
            paragraph
          >
            {
              mode === "collapsed" ? 
                <>
                  {collapsedText}
                  {collapsedText.length < expandedText.length && (
                    <span className={`element-non-selectable ${controlsClassName}`} onClick={moreControlClick ? moreControlClick : (e)=>{e.stopPropagation(); setMode("expanded");}}>
                      {" "}more
                    </span>
                  )}
                </>
                :
                <>
                  {expandedText}
                  {(collapsable && expandedText.length>collapsedText.length) && (
                    <span className={`element-non-selectable ${controlsClassName}`} onClick={(e)=>{e.stopPropagation(); setMode("collapsed");}}> 
                      {" "}less
                    </span>
                  )}
                </>
            }
          </Text> 
        </div>
      </>
    );
  }
}
