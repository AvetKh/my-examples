import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { selectUserLoggedInState } from "../app/slices/userSlice";


export function useAuthState() {
	
	const isLoggedIn = useSelector(selectUserLoggedInState);
	const navigation = useNavigation<any>();
	
	const goToLoginScreen = useCallback(() => {
		navigation.navigate('Auth');
	}, [navigation]);
	
	return {
		isLoggedIn,
		goToLoginScreen,
	}
}
