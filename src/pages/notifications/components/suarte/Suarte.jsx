import { midfix, prefix, suffix } from "./constant";

import "./Suarte.css";

export default function Suarte({ value }) {
  return (
    <>
      {value?.status !== undefined && <span>{prefix[value.status]}</span>}
      {value?.subject && <span className="">{value.subject}</span>}
      {value?.status !== undefined && <span>{midfix[value.status]}</span>}
      {value?.object && <span>{value.object}</span>}
      {value?.status !== undefined && <span>{suffix[value.status]}</span>}
      {value?.result &&
        (value.status == 42 ? (
          <span>{value.result}</span>
        ) : (
          <span>{value.result}</span>
        ))}
    </>
  );
}
