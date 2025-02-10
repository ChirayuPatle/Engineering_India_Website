import envConfig from "@/config/envconfig";
import {
  Client,
  Account,
  OAuthProvider,
  Avatars,
  Databases,
  Storage,
} from "appwrite";

const appwriteClient = new Client();
appwriteClient
  .setEndpoint(envConfig.appwriteEndpoint)
  .setProject(envConfig.appwriteProjectId);

export const account = new Account(appwriteClient);
export const database = new Databases(appwriteClient);
export const avatars = new Avatars(appwriteClient);
export const storage = new Storage(appwriteClient);

export class AppwriteService {
  async loginWithGoogle() {
    try {
      const user = await account.createOAuth2Session(
        OAuthProvider.Google,
        "http://localhost:3000/",
        "http://localhost:3000/error"
      );
      console.log("USER DETAILS", user);
    } catch (error) {
      console.log("Error While Authenticating User", error);
      throw error;
    }
  }

  async getCurrentUserDetail() {
    try {
      return await account.get(); // Only fetch user details
    } catch (error) {
      console.log("Error getting current user", error);
      return null;
    }
  }

  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("Error logging out", error);
      throw error;
    }
  }
}

export const userService = new AppwriteService();
