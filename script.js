
const ammountInput = document.getElementById('ammount');
const descriptionInput = document.getElementById('description');
const catagoryInput = document.getElementById('selectCat');
const addExpBtn = document.getElementById('addexpbtn');
const dispDiv = document.getElementById('display');
const itemList = document.getElementById('list');


let crudURL = 'https://crudcrud.com/api/a45e37be7bc34c0dba17dfb85a666ff5/expenceTracker';
axios.get(crudURL)
.then((response)=>{
    let expences=response.data;
    if (expences.length===0) return; // if no data, do nothing
    for (let expence of expences) {dispUser(expence);}
})
.catch(err=>console.log(err));

function dispUser(expence) {
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
    axios.post(crudURL,expence)
    .then((response)=>{
        dispUser(response.data);
    })
    .catch(err=>console.log(err));

    ammountInput.value = '';
    descriptionInput.value = '';
});


itemList.addEventListener('click', EditDelete);
function EditDelete(e){
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
        // console.log(data);
        let url = `${crudURL}/${li.id}`;
        // delete user data in crudcrud
        axios.delete(url).catch(err=>console.log(err));
    }
    if (e.target.classList.contains('edit')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
        let url = `${crudURL}/${li.id}`;
        axios.delete(url).catch(err=>console.log(err));
        ammountInput.value = li.ammount;
        descriptionInput.value = li.description;
        catagoryInput.value = li.catagory;
    }
}

