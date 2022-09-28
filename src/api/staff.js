// 员工
import request from "@/utlis/require";

// 获取供货商数据
const getstaffList = (page, pageSize, data) =>{
    return request({
        url: `/staff/list/search/${page}/${pageSize}`,
        method: "post",
        data,
    })
}


// 添加
const staffAdd = (data) => {
    return request({
        url: '/staff',
        method: "post",
        data,
    })
}

// 点击编辑 获取当前行的 信息
const staffItem = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "get",
    })
}

// 点击确认 保存 修改 过后 的值
const staffEdit = (id, data) => {
    return request({
        url: `/staff/${id}`,
        method: "PUT",
        data,
    })
}

// 删除
const staffDelete = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "DELETE",
    })
}
export default {
    getstaffList,
    staffAdd,
    staffItem,
    staffEdit,
    staffDelete,
}