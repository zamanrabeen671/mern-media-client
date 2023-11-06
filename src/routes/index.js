import {
    Route, Routes
} from "react-router-dom";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import { Signin } from "../pages/Auth/Signin";
import { Home } from "../pages/Home";
import SinglePost from "../pages/Media/SinglePost";

export const AppRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route exact path="/auth" element={<Signin />} />
            <Route exact path="/post/:postId" element={<PrivateRoute><SinglePost /></PrivateRoute>} />
        </Routes>
    )
}