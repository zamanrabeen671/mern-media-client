import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    let location = useLocation();
    let accessToken = localStorage.getItem("uid");

    if (accessToken) {
        return children;
    } else {
        return <Navigate to="/auth" state={{ from: location }} />;
    }
};

export default PrivateRoute;