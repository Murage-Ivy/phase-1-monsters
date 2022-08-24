let page = 1;
document.addEventListener('DOMContentLoaded', () => {
    getMonsters();
    createMonsterForm()
    addNavListeners()
})

const getMonsters = (a) => {
    return fetch(`http://localhost:3000/monsters/?_page=${a}&_limit=50`)
        .then(res => res.json())
        .then(
            monsters => {
                document.querySelector('#monster-container').innerHTML = ''
                for (let i = 0; i < monsters.length; i++) {
                    monsterCard(monsters[i])

                }
            });

}

const monsterCard = (a) => {
    let w = document.createElement('div'),
        x = document.createElement('h2'),
        y = document.createElement('h4'),
        z = document.createElement('p');
    x.textContent = `${a.name}`;
    y.textContent = `Age: ${a.age},`;
    z.textContent = `Bio: ${a.description}`;
    w.appendChild(x);
    w.appendChild(y);
    w.appendChild(z);
    document.querySelector('#monster-container').appendChild(w);

}

const createMonsterForm = () => {
    const a = document.createElement('form'),
        b = document.createElement('input'),
        c = document.createElement('input'),
        d = document.createElement('input'),
        e = document.createElement('button');
    a.id = 'monster-form';
    b.id = 'name',
        c.id = 'age',
        d.id = 'description',
        b.placeholder = 'Enter monster name',
        c.placeholder = 'age...',
        d.placeholder = 'description...',
        e.innerHTML = 'Create',
        a.appendChild(b), a.appendChild(c), a.appendChild(d), a.appendChild(e), document.getElementById('create-monster').appendChild(a), addSubmitEventListener()
}

const getFormData = () => {
    let a = document.querySelector('#name'),
        b = document.querySelector('#age'),
        c = document.querySelector('#description');
    let monsterObject = {
        name: a.value,
        age: parseInt(b.value),
        description: c.value
    }
    return monsterObject;
}


const postData = () => {
    fetch('http://localhost:3000/monsters', c = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(a)
    }).then(res => res.json()).then(data => console.log('new mosnter', data))
}

const clearForm = () => {
    document.querySelector('#monster-form').reset();
}
const addSubmitEventListener = () => {
    document.querySelector('#monster-form').addEventListener('submit', (e) => {
        e.preventDefault(), postData(getFormData()), clearForm()
    })
}

const addNavListeners = () => {
    let a = document.querySelector('#back'),
        b = document.querySelector('#forward');
    a.addEventListener('click', () => {
        pageDown()
    }), b.addEventListener('click', () => {
        pageUp()
    })
},
pageUp = () => {
    page++, getMonsters(page)
},
pageDown = () => {
    page > 1 ? (page--, getMonsters(page)) : alert('Aint no monsters here')
}