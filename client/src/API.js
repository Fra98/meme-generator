async function logIn(credentials) {
    let response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: credentials.email,
            password: credentials.password
        }),
    })
    
    if (response.ok) {
        const user = await response.json();
        return user;
    } else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        } catch (err) {
            throw err;
        }
    }
}

async function getUserInfo() {
    const response = await fetch('/api/sessions/current');
    const userInfo = await response.json();

    if (response.ok)
      return userInfo;
    else 
      throw userInfo;  // an object with the error coming from the server
}

async function logOut() {
    await fetch('/api/sessions/current', { method: 'DELETE' });
}


async function createMeme(newMeme) {
    const response = await fetch('/api/meme/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ ...newMeme, protected : newMeme.prot })
    });

    if (!response.ok)
        throw new Error(JSON.stringify({ status: response.status, error: response.important }));
}

async function copyMeme(copiedMeme) {
    const response = await fetch('/api/meme/copy/'+copiedMeme.id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ ...copiedMeme, protected : copiedMeme.prot })
    });

    if (!response.ok)
        throw new Error(JSON.stringify({ status: response.status, error: response.important }));
}

async function getMemes(isLoggedIn) {
    let url = isLoggedIn ? '/api/memes/all' : '/api/memes/public';
    const response = await fetch(url);
    const memes = await response.json();

    if (response.ok)
        return memes;
    else
        throw new Error(JSON.stringify({ status: response.status, error: 'GET memes error!' }));
}

async function deleteMeme(toBeDeleted) {
    const response = await fetch('/api/meme/' + toBeDeleted.id, { method: 'DELETE' });

    if (!response.ok)
        throw new Error(JSON.stringify({ status: response.status, error: 'DELETE meme error!' }))
}

const API = { logIn, getUserInfo, logOut, createMeme, copyMeme, deleteMeme, getMemes };

export default API;