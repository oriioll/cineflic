import { supabase } from '@/supabase'

export const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    return data.session?.user
  } else {
    return null
  }
}
