import { supabase } from "../utils/supabase"; 

//send account information to supabase auth and return whether user data is valid or error 
export async function signUp(email, password) {
	const { data, error } = await supabase.auth.signUp({ email, password }); 
	if (error) {
		throw error; 
	}
	return data; 
}
