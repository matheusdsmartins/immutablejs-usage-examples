import http from '../../utils/http'

// Endpoints
const getRolesEndpoint = '/roles/application_user_roles'
const getProfileEndpoint = '/teacher_profiles'
const getUserEndpoint = '/users'
const setRoleEndpoint = '/roles/user'

export const setRole = () => {
  return http
    .post(setRoleEndpoint, {
      user_application_id: 17,
      user_role_id: 5
    })
    .then(res => res.data.data)
    .catch(e => Promise.reject(e))
}

export const getRoles = () => {
  return http
    .get(getRolesEndpoint, {
      params: {
        user_application_id: 17
      }
    })
    .then(res => res.data.data)
    .catch(e => Promise.reject(e))
}

export const getProfile = userId => {
  return http
    .get(getProfileEndpoint, {
      params: {
        user_ids: userId
      }
    })
    .then(res => res.data.data)
    .catch(e => Promise.reject(e))
}

export const saveProfile = params => {
  return http
    .post(getProfileEndpoint, params)
    .then(res => res.data)
    .catch(e => Promise.reject(e))
}

export const updateUser = ({ id, params }) => {
  return http
    .put(`${getUserEndpoint}/${id}`, params)
    .then(res => res.data)
    .catch(e => Promise.reject(e))
}
