// 商品
import request from "@/utlis/require";

// 获取供货商数据
const getgoodsList = (page, pageSize, data) =>{
    return request({
        url: `/goods/list/search/${page}/${pageSize}`,
        method: "post",
        data,
    })
}


// 添加
const goodsAdd = (data) => {
    return request({
        url: '/goods',
        method: "post",
        data,
    })
}

// 点击编辑 获取当前行的 信息
const goodsItem = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "get",
    })
}

// 点击确认 保存 修改 过后 的值
const goodsEdit = (id, data) => {
    return request({
        url: `/goods/${id}`,
        method: "PUT",
        data,
    })
}

// 删除
const goodsDelete = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "DELETE",
    })
}
export default {
    getgoodsList,
    goodsAdd,
    goodsItem,
    goodsEdit,
    goodsDelete,

}