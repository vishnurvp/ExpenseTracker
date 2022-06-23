
const ammountInput = document.getElementById('ammount');
const descriptionInput = document.getElementById('description');
const catagoryInput = document.getElementById('selectCat');
const addExpBtn = document.getElementById('addexpbtn');
const dispDiv = document.getElementById('display');
const itemList = document.getElementById('list');


let crudURL = 'https://crudcrud.com/api/0daecd20348643d0a4bd50b3b49abf54/expenceTracker';
async function getdata() {
    try {
        let response = await axios.get(crudURL);
        let expences=response.data;
        if (expences.length===0) return; // if no data, do nothing
        for (let expence of expences) {dispUser(expence);}
    } catch (error) {
        console.log(error);
    }
}
getdata();


async function dispUser(expence) {
    let li = document.createElement('li');
    li.id = expence._id;
    li.ammount = expence.ammount;
    li.description = expence.description;
    li.catagory = expence.catagory;
    li.innerHTML = `${expence.ammount} - ${expence.description} - ${expence.catagory} `;

    let editbtn = document.createElement('button');
    editbtn.innerHTML = 'Edit';
    editbtn.className = 'edit';
    li.appendChild(editbtn);

    let deletebtn = document.createElement('button');
    deletebtn.innerHTML = 'Delete';
    deletebtn.className = 'delete';
    li.appendChild(deletebtn);

    itemList.appendChild(li);
}

addExpBtn.addEventListener('click', () => {
    let expence = {};
    if (ammountInput.value === '') {
        return;
    }
    expence.ammount = ammountInput.value;
    expence.description = descriptionInput.value;
    expence.catagory = catagoryInput.value;
    async function postData() {
        try {
            let response = await axios.post(crudURL,expence)
            dispUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    postData();
    ammountInput.value = '';
    descriptionInput.value = '';
});


itemList.addEventListener('click', EditDelete);
async function EditDelete(e){
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
        // console.log(data);
        let url = `${crudURL}/${li.id}`;
        // delete user data in crudcrud      
        try { let res = await axios.delete(url); } catch (error) { console.log(error);}
    }
    if (e.target.classList.contains('edit')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
        let url = `${crudURL}/${li.id}`;
        try { let res = await axios.delete(url); } catch (error) { console.log(error);}
        ammountInput.value = li.ammount;
        descriptionInput.value = li.description;
        catagoryInput.value = li.catagory;
    }
}

