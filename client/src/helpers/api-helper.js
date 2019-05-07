const baseUrl = "http://localhost:3000";

export const showPosts = () => {
  return fetch(`${baseUrl}/posts`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const showPlayers = () => {
  return fetch(`${baseUrl}/players`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const showPostItem = (id) => {
  return fetch(`${baseUrl}/posts/${id}`)
    .then(resp => resp.json())
    .catch(e => e)
}

export const postPost = (item) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };

  return fetch(`${baseUrl}/posts/`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const putPost = (id, item) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  };

  return fetch(`${baseUrl}/posts/${id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const destroyPost = (id) => {
  const opts = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }

  return fetch(`${baseUrl}/posts/${id}`, opts)
    .catch(e => e)
}

export const putPostFlavor = (post_id, id) => {
  const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }

//   ~~~review code below ~~~

  return fetch(`${baseUrl}/posts/${post_id}/players/${id}`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const loginUser = (loginData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ auth: loginData }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/user_token`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}

export const registerUser = (registerData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ user: registerData }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${baseUrl}/users`, opts)
    .then(resp => resp.json())
    .catch(e => e)
}






