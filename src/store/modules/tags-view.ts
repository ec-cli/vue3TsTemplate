

/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 19:15:59
 */
import { RouteLocationNormalized } from "vue-router";
export type ITagView = Partial<RouteLocationNormalized>

export const useTagsViewStore = defineStore("tags-view",() => {
    const visitedViews = ref<ITagView[]>([])

    const delVisitedView = (view:ITagView) => {
        for (const [i,v] of visitedViews.value.entries()) {
            if (v.path === view.path) {
                visitedViews.value.splice(i,1)
                break
            }
        }
    }
    const delOtherVisitedViews = (view: ITagView) => {
        visitedViews.value = visitedViews.value.filter(v => {
            return v.meta?.affix || v.path == view.path
        })
    }
    const delAllVisitedViews = () => {
        const affixTags = visitedViews.value.filter(tag => tag.meta?.affix)
        visitedViews.value = affixTags
    }
    const addVisitedView = (view: ITagView) => {
        if (visitedViews.value.some((v,index) => {
            if(v.path == view.path) {
                if (v.fullPath != view.fullPath) {
                    visitedViews.value[index] = Object.assign({},view)
                } else {
                    return true
                }
            }
        })) {
            return 
        }
        visitedViews.value.push(Object.assign({},view))
    }
    return {visitedViews,delVisitedView,delOtherVisitedViews,delAllVisitedViews,addVisitedView}
})