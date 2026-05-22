"use client"

import { UpdateUserProfile } from "@/components/UpdateUserProfile";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";


const ProfilePage = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;
    // console.log(user);
    return (
        <div>
            <Card className="max-w-96 mx-auto flex flex-col items-center border mt-20">
                <Avatar className="h-20 w-20">
                    <Avatar.Image alt="John Doe" src={user?.image}
                        referrerPolicy="no-feferr"
                    />
                    <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <h2 className="text-3xl font-bold">{user?.name}</h2>
                <p className="text-muted">{user?.email}</p>
                <UpdateUserProfile></UpdateUserProfile>
            </Card>
        </div>
    );
};

export default ProfilePage;