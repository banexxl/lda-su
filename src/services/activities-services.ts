import { supabase } from "src/lib/supabase"
import { Activity } from "src/types/activity"

type ActivityWithStringId = Activity & { _id: string };

const mapActivity = (row: any): ActivityWithStringId => ({
     _id: row.id,
     activityURL: row.activity_url,
     title: row.title,
     gallery: row.gallery ?? [],
     coverURL: row.cover_url,
     links: row.links ?? [],
     publishedDate: row.published_date,
     category: row.category,
     favorited: row.favorited,
     favoritedNumber: row.favorited_number ?? 0,
     descriptions: row.descriptions ?? [],
     author: row.author,
     status: row.status,
     list: row.list ?? [],
     listTitle: row.list_title,
     quillEditorData: row.quill_editor_data,
})

const activityServices = () => {

     const getAllActivities = async () => {
          const { data, error } = await supabase
               .from('activities')
               .select('*')
               .eq('locale', 'sr')

          if (error) {
               console.log({ message: error.message })
               return []
          }
          return (data ?? []).map(mapActivity)
     }

     const getActivityByLink = async (activityURL: string): Promise<ActivityWithStringId | undefined> => {
          const { data, error } = await supabase
               .from('activities')
               .select('*')
               .eq('locale', 'sr')
               .eq('activity_url', activityURL)
               .maybeSingle()

          if (error || !data) {
               if (error) console.log({ message: error.message })
               return undefined
          }
          return mapActivity(data)
     }

     const getCompletedActivities = async () => {
          const { data, error } = await supabase
               .from('activities')
               .select('*')
               .eq('locale', 'sr')
               .eq('status', 'completed')
               .order('published_date', { ascending: true })

          if (error) {
               console.log({ message: error.message })
               return []
          }
          return (data ?? []).map(mapActivity)
     }

     const getActivitiesByCategory = async (category: string) => {
          const { data, error } = await supabase
               .from('activities')
               .select('*')
               .eq('locale', 'sr')
               .eq('category', category)
               .order('published_date', { ascending: true })

          if (error) {
               console.log({ message: error.message })
               return []
          }
          return (data ?? []).map(mapActivity)
     }

     const getFeaturedCompletedActivities = async () => {
          const { data, error } = await supabase
               .from('activities')
               .select('*')
               .eq('locale', 'sr')
               .eq('status', 'completed')
               .limit(6)

          if (error) {
               console.log({ message: error.message })
               return []
          }
          return (data ?? []).map(mapActivity)
     }

     const getInProgressActivities = async () => {
          const { data, error } = await supabase
               .from('activities')
               .select('*')
               .eq('locale', 'sr')
               .eq('status', 'in-progress')

          if (error) {
               console.log({ message: error.message })
               return []
          }
          return (data ?? []).map(mapActivity)
     }

     return {
          getAllActivities,
          getActivitiesByCategory,
          getActivityByLink,
          getCompletedActivities,
          getInProgressActivities,
          getFeaturedCompletedActivities,
     }
}

export default activityServices
