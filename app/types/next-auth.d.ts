import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user : {
            name? : string | null;
            username? : string | null;
            email? : string | null;
            image? : string | null;
            id : string;
            role : "user" | "organizer";
            isProfileComplete : boolean;
        }
    };
    interface user {
        id : string;
        username : string;
        role: "user" | "organizer";
        isProfileComplete: boolean;
    };
    interface JWT {
        id : string;
        username : string;
        role : "user" | "organizer";
        isProfileComplete : boolean;
    }
}