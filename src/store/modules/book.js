const book ={
    state: {
        test:1
      },
      mutations: {
        'SET_TEST':(state,newTest)=>{
          state.test = newTest
        }
      },
      actions: {
        setTest:({commit,state},newTest)=>{
         return  commit('SET_TEST',newTest) // 返回Promise对象，故调用该方法可以执行then
        }
      }
}
export default book