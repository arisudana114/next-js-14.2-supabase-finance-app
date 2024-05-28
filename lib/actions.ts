"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { settingsSchema, transactionSchema } from "./validation";
import { redirect } from "next/navigation";

export async function createTransaction(formData: FormData) {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const { error } = await createClient()
    .from("transactions")
    .insert(validated.data);

  if (error) {
    throw new Error("Failed creating the transaction");
  }

  revalidatePath("/dashboard");
}

export async function fetchTransactions(range: string, offset = 0, limit = 10) {
  const supabase = createClient();

  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("We can't fetch transactions");
  return data;
}

export async function deleteTransaction(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
}

export async function updateTransaction(id: string, formData: FormData) {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const { error } = await createClient()
    .from("transactions")
    .update(formData)
    .eq("id", id);

  if (error) {
    throw new Error("Failed editing the transaction");
  }

  revalidatePath("/dashboard");
}

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email");

  if (typeof email !== "string" || !email) {
    return {
      error: true,
      message: "Invalid email address!",
    };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return {
      error: true,
      message: "Error authenticating!",
    };
  }

  return {
    message: `Email sent to ${email}`,
  };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/login");
}

export async function uploadAvatar(prevState: any, formData: FormData) {
  const supabase = createClient();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    // Handle the case where file is not provided or not a File instance
    return;
  }
  // Original extension
  // File name would be generated
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error) {
    return {
      error: true,
      message: "Error uploading avatar",
    };
  }

  // Removing the old file
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return {
      error: true,
      message: "Something went wrong, try again",
    };
  }

  const avatar = userData.user?.user_metadata.avatar;

  if (avatar) {
    const { error } = await supabase.storage.from("avatars").remove([avatar]);

    if (error) {
      return {
        error: true,
        message: "Something went wrong, try again",
      };
    }
  }

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });

  if (dataUpdateError) {
    return {
      error: true,
      message: "Error associating the avatar with the user",
    };
  }

  return {
    message: "Updated the user avatar",
  };
}

export async function updateSettings(prevState: any, formData: FormData) {
  const validated = settingsSchema.safeParse({
    fullName: formData.get("fullName"),
    defaultView: formData.get("defaultView"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: validated.data.fullName,
      defaultView: validated.data.defaultView,
    },
  });
  if (error) {
    return {
      error: true,
      message: "Failed updating setting",
      errors: {},
    };
  }

  return {
    message: "Updated user settings",
    errors: {},
  };
}
