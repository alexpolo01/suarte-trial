import { actions } from './constant.jsx';

import './Interaction.css';

export default function Interaction( { value } ) {
  
  return (
    <>
      <b>{value?.subject}</b>
      <span>{actions[value?.status]}</span>
      <i>{value?.object}</i>
      <span>{value?.result}</span>
      <span>{value?.period}</span>
    </>
  );
}
