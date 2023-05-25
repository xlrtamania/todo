const BACKEND = "http://localhost:5000"

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function storeUserCookie(user) {

  document.cookie = "mongotodo_user=" + JSON.stringify(user)
}

function removeUserCookie() {

  document.cookie = "mongotodo_user="
}



// accounts fcts

export async function createAccount(userInfo) {
  const response = await fetch(BACKEND + '/api/utilisateurs/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
  if (!response.ok) {
    throw new Error('Failed to create account');
  }
  const user = await response.json();
  storeUserCookie(user)
}



export async function login(credentials) {

  const response = await fetch(BACKEND + '/api/utilisateurs/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    console.log()
    throw new Error('Failed to login');
  }
  const user = await response.json();
  storeUserCookie(user)
}

export async function logout() {
  removeUserCookie()
}

export async function isLogged() {
  return getCookie("mongotodo_user") !== ""
  // return true
}
// we can use cookies, however it should return the whole user object
export async function getCurrentUser() {
  try {
    return JSON.parse(getCookie("mongotodo_user"))
  } catch (error) {
    return null
  }
}

//tasks fcts

export async function deleteTask(task) {
  const response = await fetch(BACKEND + `/api/taches/${task.id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return true;
}

export async function createTask(task) {
  const response = await fetch(BACKEND + '/api/taches/addTache', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  const createdTask = await response.json();
  return createdTask;
}

export async function modifyTask(task) {
  const response = await fetch(BACKEND + `/api/taches/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('modification est echouée');
  }
  const modifiedTask = await response.json();
  return modifiedTask;
}

export async function getAllTasks() {
  const response = await fetch(BACKEND + '/api/taches');
  if (!response.ok) {
    throw new Error('la recuperation de toutes les tasks est echouée');
  }
  const tasks = await response.json();
  console.log(tasks);
  return tasks;
}

export async function getAllTasksByKeyWord(kw) {
  const response = await fetch(BACKEND + `/api/taches/search/${kw}`);
  if (!response.ok) {
    throw new Error('la recuperation de toutes les tasks par mot clé est echouée');
  }
  const tasks = await response.json();
  return tasks;
}
// stats

export async function getStats() {
  //must return an obj of the following type
  return { total: 6, todo: 1, doing: 2, done: 3 }
}
