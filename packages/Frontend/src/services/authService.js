import { supabase } from "../utils/supabase"; 

//send account information to supabase auth and return whether user data is valid or error 
export async function signUp(email, password, username) {
	const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username: username} } }); 
	if (error) {
		throw error; 
	}
	return data; 
}
// use email and password to find existing account
export async function logIn(email, password) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password}); 
	if (error) {
		throw error; 
	}
	return data; 
}
