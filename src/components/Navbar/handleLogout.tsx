import { getAuth, signOut } from "firebase/auth";

const handleLogout = async (): Promise<void> => {
  try {
    const auth = getAuth(); 
    await signOut(auth); 
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default handleLogout;
