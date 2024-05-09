
import "./miscmenu.css";
import { useNavigate } from "react-router-dom";
import { } from "../../../router/Approuter";

export default function MiscMenu() {
    const navigate = useNavigate()

    const handleProfileNavigation = () => {
        console.log("Profile");
        //navigate();
    }
    const handleNotificationNavigation = () => {
        //navigate();
    }
    const handleSearchNavigation = () => {
        //navigate();
    }


    return (
        //Card
        <div className="menu-container" >
            {/* User Profile */}
            <button className="menu-button" onClick={handleProfileNavigation}>
                <div className="profile" style={{
                    backgroundImage: `url(${'https://app.uizard.io/placeholders/avatars/avatar-2.png'})`,
                }} />
            </button>
            {/* Search */}
            <button className="menu-button" onClick={handleSearchNavigation}>
                <svg className="search"  viewBox="0 0 512 512">
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
                    </path>
                </svg>
            </button>
            {/* Bell */}
            <button className="menu-button" onClick={handleNotificationNavigation}>
                <svg className="bell"   viewBox="0 0 448 512">
                    <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z">
                    </path>
                </svg>
            </button>
        </div>
    )
}