import { useLocation } from "react-router-dom";
import { SignIn, SignUp } from "components/index";

function AuthorizationPage() {
  const location = useLocation();

  return (
    <div className="flex-1">
      {location.pathname === "/signin" ? <SignIn /> : <SignUp />}
    </div>
  );
}

export { AuthorizationPage };
