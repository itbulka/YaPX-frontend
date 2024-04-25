import { ProfilePage } from "@/components/screens/ProfilePage";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();

  return (
    <>
      <ProfilePage currentId={'12'} />
    </>
  );
}