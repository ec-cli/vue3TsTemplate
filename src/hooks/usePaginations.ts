/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-12 09:31:38
 */
interface IDefaultPaginationData {
    total: number
    currentPage: number
    pageSize: number
    pageSizes: number[]
    layout: string
}

interface IPaginationData {
    total?: number
    currentPage?: number
    pageSize?: number
    pageSizes?: number[]
    layout?: string
}

// 默认的分页参数
const defaultPaginationData: IDefaultPaginationData = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10,20,30,50,100],
    layout: "total, sizes, prev, pager,next,jumper"
}

export const usePagination = (_paginationData: IPaginationData = {}) => {
    // 合并分页参数
    const paginationData = reactive({...defaultPaginationData, ..._paginationData})

    // 改变当前页码
    const handleCurrentChange = (value: number) => {
        paginationData.currentPage = value
    }

    // 改变每页显示条数
    const handleSizeChange = (value: number) => {
        paginationData.pageSize = value
    }

    return {paginationData, handleCurrentChange, handleSizeChange}
}