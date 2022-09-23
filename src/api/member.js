// 会员模块

import request from "@/utlis/require";

const getMenberList = (page, pageSize, data) => {
    console.log(page, pageSize, data,'page, pageSize, data');
    return request({
    url: `/member/list/search/${page}/${pageSize}`,
    method: "post",
    data,
    })
} 
export default {
    getMenberList,
}