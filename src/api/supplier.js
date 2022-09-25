// 供应商
import request from "@/utlis/require";

// 获取供货商数据
const getSupplierList = (page, pageSize, data) =>{
    return request({
        url: `/supplier/list/search/${page}/${pageSize}`,
        method: "post",
        data,
    })
}


// 添加
const SupplierAdd = (data) => {
    return request({
        url: '/supplier',
        method: "post",
        data,
    })
}

// 点击编辑 获取当前行的 信息
const SupplierItem = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "get",
    })
}

// 点击确认 保存 修改 过后 的值
const SupplierEdit = (id, data) => {
    return request({
        url: `/supplier/${id}`,
        method: "PUT",
        data,
    })
}

// 删除
const SupplierDelete = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "DELETE",
    })
}
export default {
    getSupplierList,
    SupplierAdd,
    SupplierItem,
    SupplierEdit,
    SupplierDelete,

}