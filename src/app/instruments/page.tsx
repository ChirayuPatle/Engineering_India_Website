import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";

export default async function Instruments() {
  // const supabase = await createClient();

  let { data: events, error } = await supabase.from("events").select("*");

  console.log(events);

  return <div>{JSON.stringify(events, null, 2)}</div>;
}
