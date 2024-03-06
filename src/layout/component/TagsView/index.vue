<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-07 15:51:33
-->
<template>
  <div class="tags-view-container">
    <div class="scroll-container">
      <el-icon class="arrow left" @click="scrollTo('left')">
        <ArrowLeft />
      </el-icon>
      <el-scrollbar ref="scrollbarRef" @scroll="scroll">
        <div class="scrollbar-content" ref="scrollbarContentRef">
          <div class="tags-view-wrapper">
            <router-link
              v-for="tag in tagsViewStore.visitedViews"
              :key="tag.path"
              :class="isActive(tag) ? 'active' : ''"
              class="tags-view-item"
              :to="{ path: tag.path, query: tag.query }"
            >
              {{ tag.meta?.title }}
              <el-icon :size="12" @click.prevent.stop="closeSelectedTag(tag)" v-if="!isAffix(tag)">
                <Close />
              </el-icon>
            </router-link>
          </div>
        </div>
      </el-scrollbar>
      <el-icon class="arrow right" @click="scrollTo('right')">
        <ArrowRight />
      </el-icon>
      <div class="contextmenu">
        <el-dropdown>
          <el-button size="small" type="primary">
            <span>更多</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="refresh(selectedTag)"
                ><el-icon><Refresh /> </el-icon>刷新</el-dropdown-item
              >
              <el-dropdown-item v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)"
                ><el-icon><Remove /></el-icon>关闭当前</el-dropdown-item
              >
              <el-dropdown-item @click="closeOthersTag"
                ><el-icon><CircleClose /></el-icon>关闭其他</el-dropdown-item
              >
              <el-dropdown-item @click="closeAllTags(selectedTag)"
                ><el-icon><Delete /></el-icon>关闭所有</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {type ITagView,useTagsViewStore} from "@/store/modules/tags-view"
import {usePermissionStore} from "@/store/modules/permission"
import { RouteRecordRaw } from "vue-router"
import path from "path-browserify"
import { ElScrollbar } from "element-plus"

const tagsViewStore = useTagsViewStore()
const route = useRoute()
const router = useRouter()
const permissionStore = usePermissionStore()
// 通过 getCurrentInstance 方法获取当前组件实例
const instance = getCurrentInstance()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollbarContentRef = ref<HTMLDivElement>()

// 当前滚动条距离左边的距离
let currentScrollLeft = 0
// 每次滚动距离
const translateDistance = 200
const selectedTag = ref<ITagView>({})
let affixTags: ITagView[] = []

// 点击滚动
const scrollTo = (direction: "left" | "right") => {
  let scrollLeft = 0
  /** 可滚动内容的长度 */
  const scrollbarContentRefWidth = scrollbarContentRef.value!.clientWidth
  /** 滚动可视区宽度 */
  const scrollbarRefWidth = scrollbarRef.value!.wrapRef!.clientWidth

  // 最后剩余可滚动的宽度
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft
  // 没有横向滚动条，直接结束
  if (scrollbarRefWidth > scrollbarContentRefWidth) return
  if (direction == "left") {
    scrollLeft = Math.max(0, currentScrollLeft - translateDistance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + translateDistance, currentScrollLeft + lastDistance)
  }
  scrollbarRef.value!.setScrollLeft(scrollLeft)
}

// 滚动时触发
const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
  currentScrollLeft = scrollLeft
}
const isActive = (tag:ITagView) => {
  selectedTag.value = tag;
  return tag.path == route.path
}
const isAffix = (tag: ITagView) => {
  return tag.meta?.affix
}
// 刷新
const refresh = (view:ITagView) => {
  router.replace({path: "/redirect" + view.path,query: view.query})
}
// 关闭
const closeSelectedTag = (view: ITagView) => {
  tagsViewStore.delVisitedView(view)
  if (isActive(view)) {
    toLastView(tagsViewStore.visitedViews,view)
  }
}
// 关闭其他
const closeOthersTag = () => {
  if (selectedTag.value.fullPath != route.path && selectedTag.value.fullPath !== undefined) {
    router.push(selectedTag.value.fullPath)
  }
  tagsViewStore.delOtherVisitedViews(selectedTag.value)
}
// 关闭所有
const closeAllTags = (view: ITagView) => {
  tagsViewStore.delAllVisitedViews()
  if (affixTags.some(tag => tag.path == route.path)) {
    return
  }
  toLastView(tagsViewStore.visitedViews,view)
}

const toLastView = (visitedViews: ITagView[],view: ITagView) => {
  const lastView = visitedViews.slice(-1)[0]
  if (lastView != undefined && lastView.fullPath != undefined) {
    router.push(lastView.fullPath)
  } else {
    // 如果tagsview全部被关闭，则默认重定向到主页
    if (view.name === "Dashboard") {
      router.push({path: "/redirect"+view.path,query: view.query})
    } else {
      router.push("/")
    }
  }
}

const initTags = () => {
  affixTags = filterAffixTags(permissionStore.routes)
  for (const tag of affixTags) {
    // 必须含有name属性
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}
const filterAffixTags = (routes: RouteRecordRaw[],basePath = "/") => {
  let tags: ITagView[] = []
  routes.forEach(route => {
    if (route.meta?.affix) {
      const tagPath = path.resolve(basePath,route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: {...route.meta}
      })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children,route.path)
      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })
  return tags
}
const addTags = () => {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
  }
}
watch(
  route, 
  () => {
   addTags()
  },
  {deep: true})

onMounted(() => {
  initTags()
  addTags()
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: var(--fp-tagsview-height);
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 #00000010, 0 0 3px 0 #00000010;
  position: relative;
  .scroll-container {
    height: 100%;
    user-select: none; // 用于设置或检索是否允许用户选中文本
    display: flex;
    justify-content: space-between;
    align-items: center;
    .arrow {
      width: 40px;
      height: 100%;
      cursor: pointer;
      // &.left {
      //   box-shadow: 5px 0 5px -6px #ccc;
      // }
      // &.right {
      //   box-shadow: -5px 0 5px -6px #ccc;
      // }
    }
    .el-scrollbar {
      flex: 1;
      // 横向超出窗口长度时，显示滚动条
      white-space: nowrap;
      .scrollbar-content {
        display: inline-block;
        .tags-view-wrapper {
          .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid var(--fp-tagsview-tag-border-color);
            border-radius: var(--fp-tagsview-tag-border-radius);
            color: var(--fp-tagsview-tag-text-color);
            background: var(--fp-tagsview-tag-bg-color);
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
              margin-left: 5px;
            }
            &:last-of-type {
              margin-right: 5px;
            }
            &.active {
              background: var(--fp-tagsview-tag-active-bg-color);
              color: var(--fp-tagsview-tag-active-text-color);
              border-color: var(--fp-tagsview-tag-active-border-color);
              &::before {
                content: "";
                background: var(--fp-tagsview-tag-active-before-color);
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                position: relative;
                margin-right: 2px;
              }
            }
            .el-icon {
              margin: 0 2px;
              vertical-align: middle;
              border-radius: 50%;
              &:hover {
                background: var(--fp-tagsview-tag-icon-hover-bg-color);
                color: var(--fp-tagsview-tag-icon-hover-color);
              }
            }
          }
        }
      }
    }
    .contextmenu {
      width: 80px;
      margin-top: 4px;
    }
  }
}
</style>