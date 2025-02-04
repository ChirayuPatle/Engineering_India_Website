import envConfig from "@/config/envconfig";
import { Client, Account, OAuthProvider } from "appwrite";

const appwriteClient = new Client();
appwriteClient
  .setEndpoint(envConfig.appwriteEndpoint)
  .setProject(envConfig.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  async loginWithGoogle() {
    try {
      const response = await account.createOAuth2Session(
        OAuthProvider.Google,
        "http://localhost:3000/dashboard",
        "http://localhost:3000/error"
      );
      console.log("RESPONSE", response);
    } catch (error) {
      console.log("Error While Authenticating User", error);
    }
  }
}
