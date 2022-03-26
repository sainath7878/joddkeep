import { useLocation } from "react-router-dom";
import { SignIn, SignUp } from "components/index";

function AuthorizationPage() {
  const location = useLocation();

  return (
    <div className="container">
      {location.pathname === "/signin" ? <SignIn className="flex-1"/> : <SignUp className="flex-1"/>}
    </div>
  );
}

export { AuthorizationPage };
