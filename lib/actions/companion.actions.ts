"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  topic,
  subject,
}: GetAllCompanions) => {
  const { userId: author } = await auth();

  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select().eq("author", author);

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  const companionIds = companions.map((companion) => companion.id);

  const { data: bookmarkedCompanions, error: bookmarkedCompanionsError } =
    await supabase
      .from("bookmarked_companions")
      .select()
      .eq("user_id", author)
      .in("companion_id", companionIds);
  if (bookmarkedCompanionsError)
    throw new Error(bookmarkedCompanionsError.message);

  return companions.map((companion) => ({
    ...companion,
    isBookmarked: bookmarkedCompanions.some(
      (bookmarkedCompanion) => bookmarkedCompanion.companion_id === companion.id
    ),
  }));
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addSessionToHistory = async (companionId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select()
    .eq("companion_id", companionId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  if (data.length === 0) {
    const { data, error } = await supabase
      .from("session_history")
      .insert({ companion_id: companionId, user_id: userId });

    if (error) throw new Error(error.message);

    return data;
  }
};

export const getRecentSessions = async (limit = 10) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const bookmarkCompanion = async (companionId: string, path: string) => {
  const { userId: author } = await auth();
  if (!author) throw new Error("User not found");
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("bookmarked_companions")
    .insert({ companion_id: companionId, user_id: author });

  if (error) throw new Error(error.message);
  revalidatePath(path);

  return data;
};

export const unBookmarkCompanion = async (
  companionId: string,
  path: string
) => {
  const { userId: author } = await auth();
  if (!author) throw new Error("User not found");
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("bookmarked_companions")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", author);

  if (error) throw new Error(error.message);
  revalidatePath(path);

  return data;
};
