import { ProfilePage } from "@/components/screens/ProfilePage";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <ProfilePage currentId={id as string} />
    </>
  );
}