import { asAnon } from "src/lib/db/rls"
import { toPlain } from "src/lib/db/serialize"
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
          try {
               const rows = await asAnon((tx) => tx.activities.findMany({ where: { locale: 'sr' } }))
               return toPlain(rows).map(mapActivity)
          } catch (error: any) {
               console.log({ message: error?.message })
               return []
          }
     }

     const getActivityByLink = async (activityURL: string): Promise<ActivityWithStringId | undefined> => {
          try {
               const row = await asAnon((tx) => tx.activities.findFirst({ where: { locale: 'sr', activity_url: activityURL } }))
               if (!row) return undefined
               return mapActivity(toPlain(row))
          } catch (error: any) {
               console.log({ message: error?.message })
               return undefined
          }
     }

     const getCompletedActivities = async () => {
          try {
               const rows = await asAnon((tx) => tx.activities.findMany({
                    where: { locale: 'sr', status: 'completed' },
                    orderBy: { published_date: { sort: 'asc', nulls: 'last' } },
               }))
               return toPlain(rows).map(mapActivity)
          } catch (error: any) {
               console.log({ message: error?.message })
               return []
          }
     }

     const getActivitiesByCategory = async (category: string) => {
          try {
               const rows = await asAnon((tx) => tx.activities.findMany({
                    where: { locale: 'sr', category },
                    orderBy: { published_date: { sort: 'asc', nulls: 'last' } },
               }))
               return toPlain(rows).map(mapActivity)
          } catch (error: any) {
               console.log({ message: error?.message })
               return []
          }
     }

     const getFeaturedCompletedActivities = async () => {
          try {
               const rows = await asAnon((tx) => tx.activities.findMany({
                    where: { locale: 'sr', status: 'completed' },
                    take: 6,
               }))
               return toPlain(rows).map(mapActivity)
          } catch (error: any) {
               console.log({ message: error?.message })
               return []
          }
     }

     const getInProgressActivities = async () => {
          try {
               const rows = await asAnon((tx) => tx.activities.findMany({ where: { locale: 'sr', status: 'in-progress' } }))
               return toPlain(rows).map(mapActivity)
          } catch (error: any) {
               console.log({ message: error?.message })
               return []
          }
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
