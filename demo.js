document.body.innerHTML =`
<div class="user-form">
<label for="name">User Name:  <input type="text" placeholder="Enter user name" class="add-user-name"><br> 
<label for="url">Image URL:  <input type="text" placeholder="Enter image url" class="add-user-avatar"><br>
<button onclick=adduser() class="add">Add</button>
</div>
<section class="user_list"></section>`;

    async function getAllUsers() {
        const data=await fetch("https://616edd87715a630017b3994e.mockapi.io/users");
        const users= await data.json();
        const userContainer=document.querySelector(".user_list");
        userContainer.innerHTML= "";
        users.forEach(user =>
            userContainer.innerHTML+=
            `<div class="user_container">
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar"/>
            <div>
            <p class="user-name">${user.name}</p>
             <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
             <button class="edit" onclick="editUser(${user.id})">Edit</button><br>
             <div class="edit-user-form edit-${user.id}">
             <input type="text" value="${user.name}" class="edit-${user.id}-user-name ename" placeholder="enter username"><br>
             <input type="text" value="${user.avatar}" class="edit-${user.id}-user-avatar eavatar" placeholder="enter avatar"><br>
             <button onclick="saveUser(${user.id})">Save</button>
             </div>
            </div>
            </div>
            
            
        
            
            `
            
            );
        
        console.log(users);
    }
    
    getAllUsers();

    async function deleteUser(userId)
    {
        console.log("deleting...",userId);
        const data= await fetch("https://616edd87715a630017b3994e.mockapi.io/users/"+ userId,
        {method:"DELETE"}
        
        
        );
        
        getAllUsers();
    }

    async function adduser()
    {
        console.log("adding....");
        const name=document.querySelector(".add-user-name").value;
        const avatar=document.querySelector(".add-user-avatar").value;
        console.log(name,avatar);
        const data= await  fetch("https://616edd87715a630017b3994e.mockapi.io/users",
        {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({name:name,avatar:avatar}), 
        
        });
        getAllUsers();
    }
    
  function editUser(userId)
  {
     console.log("editing...",userId);
     
     const edituserform=document.querySelector(`.edit-${userId}`);
     edituserform.style.display=edituserform.style.display=== "block" ? "none":"block";
  
    
 }

 async function saveUser(userId)
 {
    console.log("saving...",userId)
    const editname=document.querySelector(`.edit-${userId}-user-name`).value;
    const editavatar=document.querySelector(`.edit-${userId}-user-avatar`).value;
   
    const data= await fetch("https://616edd87715a630017b3994e.mockapi.io/users/" + userId,
     {
         method:"PUT",
         headers:{"Content-type":"application/json"},
         body:JSON.stringify({name:editname,avatar:editavatar}),

     });
     
    getAllUsers();
     
}
    