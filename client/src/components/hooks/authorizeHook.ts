import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

export function useGetAuthenticateUserStatus() {
  let userStatus: any = useSelector<RootState>(store => store.auth);

  if (userStatus?.isUserAuthenticated) {
    return true;
  } else {
    return false;
  }
}
