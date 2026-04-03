import type { User } from '@supabase/supabase-js'
import { getCurrentSession } from '@/services/supabase'
import { ref, onMounted } from 'vue'

/**
 * Checks if users is logged in or not
 * @returns The Supabase current session user or null if isn't logged
 * @author Oriol Plazas León
 * @since 03/04/2026
 */
export const useGetUserOrNull = () => {
  const user = ref<User | null>(null)
  onMounted(async () => {
    user.value = await getCurrentSession()
  })

  return { user }
}
