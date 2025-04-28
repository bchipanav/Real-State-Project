import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

import React from "react";

import prisma from "@/lib/prisma";
import UserProfilePanel from "./userProfilePanel";
import { Button } from "@heroui/button";

const signInPanel = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  if (await isAuthenticated()) {
    const user = await getUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return <>{dbUser! && <UserProfilePanel user={dbUser} />}</>;
  }

  return (
    <div className="flex gap-3">
      <Button color="primary">
        <LoginLink>Sign In</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign Up</RegisterLink>
      </Button>
    </div>
  );
};

export default signInPanel;