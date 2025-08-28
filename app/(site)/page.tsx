import { createClient } from "@/lib/supabaseServer"
import MainApp from "@/components/main/MainApp"

export default async function Home() {
  const supabase = createClient()

  const supabaseClient = await supabase;

  // Fetch profile
  const { data: profile } = await supabaseClient
    .from("profile")
    .select("*")
    .limit(1)
    .single()

  // Fetch experience
  const { data: experience } = await supabaseClient
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false })
  
  // Fetch education
  const { data: education } = await supabaseClient
    .from("education")
    .select("*")
    .order("start_date", { ascending: false })
  
  // Fetch skills
  const { data: skill } = await supabaseClient
    .from("skills")
    .select("*")

  return <MainApp 
    profile={profile} 
    experience={experience || []} 
    education={education || []}
    skill={skill || []} 
  />
}