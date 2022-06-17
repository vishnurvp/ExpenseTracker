
const ammountInput = document.getElementById('ammount');
const descriptionInput = document.getElementById('description');
const catagoryInput = document.getElementById('selectCat');
const addExpBtn = document.getElementById('addexpbtn');
const dispDiv = document.getElementById('display');
const itemList = document.getElementById('list');

let data = [];
if (localStorage.data){
    data = JSON.parse(localStorage.data)
}

for (let i=0; i<data.length; i++) {
    let listdata = data[i];
    let listItem = document.createElement('li');
    listItem.id = `${listdata.ammount} - ${listdata.description} - ${listdata.catagory} `;
    listdata.id = listItem.id;
    listItem.innerHTML = listItem.id;

    let editbtn = document.createElement('button');
    editbtn.innerHTML = 'Edit';
    editbtn.className = 'edit';
    listItem.appendChild(editbtn);

    let deletebtn = document.createElement('button');
    deletebtn.innerHTML = 'Delete';
    deletebtn.className = 'delete';
    listItem.appendChild(deletebtn);

    itemList.appendChild(listItem);
}

addExpBtn.addEventListener('click', () => {
    let listdata = {};
    listdata.ammount = ammountInput.value;
    listdata.description = descriptionInput.value;
    listdata.catagory = catagoryInput.value;
    // console.log(ammount, description, catagory)
    
    let listItem = document.createElement('li');
    listItem.id = `${listdata.ammount} - ${listdata.description} - ${listdata.catagory} `
    listdata.id = listItem.id
    listItem.innerHTML = listItem.id;
    data.push(listdata);
    localStorage.setItem('data', JSON.stringify(data));


    let editbtn = document.createElement('button');
    editbtn.innerHTML = 'Edit';
    editbtn.className = 'edit';
    listItem.appendChild(editbtn);

    let deletebtn = document.createElement('button');
    deletebtn.innerHTML = 'Delete';
    deletebtn.className = 'delete';
    listItem.appendChild(deletebtn);

    itemList.appendChild(listItem);

    ammountInput.value = '';
    descriptionInput.value = '';


});

itemList.addEventListener('click', EditDelete);
function EditDelete(e){
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
        // console.log(data);
        for (let i=0; i<data.length; i++) {
            // console.log(li.id);
            // console.log(data[i].id);
            if (li.id === data[i].id) {
                data.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(data));
    }
    if (e.target.classList.contains('edit')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
        let tempdata;
        for (let i=0; i<data.length; i++) {
            tempdata = data[i];
            if (data[i].id === li.id) {
                data.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(data));
        ammountInput.value = tempdata.ammount;
        descriptionInput.value = tempdata.description;
        catagoryInput.value = tempdata.catagory;
    }

}

