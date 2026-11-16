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
// export async function logIn(email, password) {
// 	const { data, error } = await supabase.auth.signInWithPassword({ email, password}); 
// 	if (error) {
// 		throw error; 
// 	}
// 	return data; 
// }
export async function logIn(email, password) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  const { access_token, refresh_token } = result.data.session;

  const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
  if (error) throw error;

  return data;
}

//log out user
export async function logOut() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw error; 
	}
}
