import { supabase } from "../utils/supabase"; 

//send account information to supabase auth and return whether user data is valid or error 
export async function signUp(email, password, username, displayName) {
	const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username: username, display_name: displayName } } }); 
	if (error) {
		throw error; 
	}
	return data; 
}
