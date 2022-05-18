import { useState } from "react";
import "./App.css";

import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import {
    EmailPasswordAuth,
    signOut,
} from "supertokens-auth-react/recipe/emailpassword";

SuperTokens.init({
    appInfo: {
        appName: "task-super_token",
        apiDomain: "http://localhost:5000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init({ emailVerificationFeature: { mode: "REQUIRED" } }),
        Session.init(),
    ],
});

function App() {
    const [userID, setUserID] = useState(null);
    Session.getUserId().then((val) => {
        setUserID(val);
    });
    async function onLogout() {
        await signOut();
        window.location.href = "/";
    }

    if (SuperTokens.canHandleRoute()) {
        return SuperTokens.getRoutingComponent();
    }

    return (
        <EmailPasswordAuth>
            <div className="App">
                <p>You have successfully signed in; Your userID is {userID}</p>
                <button onClick={onLogout}>Sign Out</button>
            </div>
        </EmailPasswordAuth>
    );
}

export default App;
