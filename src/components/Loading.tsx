import "animate.css";
import gokuImage from '../assets/img/goku.png' 
import auraImage from '../assets/img/aura.png' 

function Loading() {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
      <div className=" grid h-44 w-44 content-center justify-center ">
        <img
          className="animate__animated animate__infinite	animate__pulse pulse col-start-1 row-start-1"
          src={auraImage}
          alt="aura"
        />
        <img
          className=" relative top-16 right-1 col-start-1 row-start-1"
          src={gokuImage}
          alt="goku"
        />
      </div>
    </div>
  );
}

export default Loading;
