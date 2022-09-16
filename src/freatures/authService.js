import axios from 'axios'

const register = async (userData) => {
   const response = await axios({
        method:'post',
        url:`${process.env.REACT_APP_BASE_URL}/register`,
        data:{
          email: userData.email,
          password: userData.password,
          name: userData.name,
        },
        withCredentials: true
      },{withCredentials:true})

      if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }


      return response.data
}

const authService = {
    register
}

export default authService