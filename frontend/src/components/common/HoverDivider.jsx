import {memo} from "react";

const HoverDivider = memo(props => {
  return (
    <div className="mx-2 mt-0 duration-500 border-b-2 opacity-0 border-cyan-600 group-hover:opacity-100"></div>
  );
});

export default HoverDivider;