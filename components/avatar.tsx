import { createClient } from "@/lib/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function Avatar({ width = 32, height = 32 }) {
  const supabase = createClient();

  try {
    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create a signed URL for the user's avatar
    const { data: signedUrl } = await supabase.storage
      .from("avatars")
      .createSignedUrl(user?.user_metadata.avatar, 60 * 5);

    // Render the user's avatar using the signed URL
    return (
      <Image
        src={signedUrl?.signedUrl || '/fallback-url'}
        width={width}
        height={height}
        alt="User avatar"
        className="rounded-full"
      />
    );
  } catch (error) {
    // Handle errors
    console.error("Error fetching user or creating signed URL:", error);
    // Render a fallback UI, e.g., a default avatar icon
    return <CircleUser className="w-6 h-6" />;
  }
}
