import React from "react";
import SettingsForm from "./components/settings-form";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();


  if (error || !data?.user) {
    return (
      <>
        <h1 className="text-4xl font-semibold mb-8">Settings</h1>
        <p>Error: Could not retrieve user data. Please try again.</p>
      </>
    );
  }

  const {
    data: {
      user: { user_metadata: defaults },
    },
  } = { data };

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>
      <SettingsForm defaults={defaults} />
    </>
  );
}
