export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
}) 

export const mutations = {
    setUserInfo(state,data){
        state.userInfo=data
    },
    clearUserInfo(state){
        state.userInfo={
            token: "",
            user: {}
        }
    }

};

export const actions = {};