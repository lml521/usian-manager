// 会员模块

import request from "@/utlis/require";

// 渲染
const getMenberList = (page, pageSize, data) => {
    console.log(page, pageSize, data, 'page, pageSize, data');
    return request({
        url: `/member/list/search/${page}/${pageSize}`,
        method: "post",
        data,
    })
}

// 添加
const getMenberAdd = (data) => {
    return request({
        url: '/member',
        method: "post",
        data,
    })
}

// 点击编辑 获取当前行的 信息
const getFindItem = (id) => {
    return request({
        url: `/member/${id}`,
        method: "get",
    })
}

// 点击确认 保存 修改 过后 的值
const getMenberEdit = (id, data) => {
    return request({
        url: `/member/${id}`,
        method: "PUT",
        data,
    })
}

// 删除
const getMenberDelete = (id) => {
    return request({
        url: `/member/${id}`,
        method: "DELETE",
    })
}
export default {
    getMenberList,
    getMenberAdd,
    getFindItem,
    getMenberEdit,
    getMenberDelete,
}