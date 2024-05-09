            // {/* Public Spaces */}
            // <PublicSpaceTilte />
            // <PublicSpacesLogo />
            // <PublicSpaceBlock>
            //     <PublicSpaceBlockTitle />
            //     <PublicSpaceBlockIcon />
            //     <PublicSpaceBlockPoster />
            //     <PublicSpaceBlockDate />
            // </PublicSpaceBlock>

import "./spaces.css";
import { useNavigate } from "react-router-dom";
import { } from "../../../router/Approuter";

export default function Spaces() {

    const navigate = useNavigate()

    const handleClick = () => {
        //navigate();
    }

    return (
        <div className="spaces-card" >
            {/* Public Spaces */}
            <div className="PublicSpaceTilte">
                Public Spaces
            </div>
            <svg className="PublicSpacesLogo"  viewBox="0 0 24 38">
                <path d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z">
                </path>
            </svg>
            <div className="PublicSpaceBlock" onClick={handleClick}>
                <div className="PublicSpaceBlockTitle">
                    Title
                </div>
                <div >
                    <svg className="PublicSpaceBlockIcon" viewBox="0 0 448 512">
                        <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z">
                        </path>
                    </svg>
                </div>
                <div className="PublicSpaceBlockPoster">
                    Julian Wan
                </div>
                <div className="PublicSpaceBlockDate">
                    Joined on Sep 20, 2021
                </div>
            </div>
        </div>
    );
}