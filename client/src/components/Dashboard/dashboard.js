import React from "react";
import Header from "./Header/header";
import Feed from "./Feed/feed";

import ClockInClockOutComponent from "../clocking/ClockComponent";
import { useCurrentUserDetails } from "../../hooks/useAuth";

export default function Dashboard() {
    const userDetails = useCurrentUserDetails();
    return (
        <>
            <Header />
            {userDetails.role === 'teacher'  && <ClockInClockOutComponent />}
            <Feed />
        </>
    );
}

