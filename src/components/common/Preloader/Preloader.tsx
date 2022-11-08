import * as React from "react";
// @ts-ignore
import preloader from "../../../assets/images/circles.svg";

let Preloader: React.FC = (props) => {
    return (
        <div style={{backgroundColor: 'green'}}>
            <img src={preloader}/>
        </div>
    );
}

export default Preloader;