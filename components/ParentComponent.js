import Aside from "./Aside";
import Header from "./Header";

function ParentComponent({ appOpen, appAsideOpen }) {
  return (
    <div>
      <Header asideOpen={appOpen} handleAsideOpen={appAsideOpen} />
      <Aside asideOpen={appOpen} handleAsideOpen={appAsideOpen} />
    </div>
  );
}

export default ParentComponent;
