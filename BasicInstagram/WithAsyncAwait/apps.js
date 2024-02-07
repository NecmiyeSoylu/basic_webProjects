//!id ye ulaşıp daha somra id kullanarak hareket etmen gerekiyor
const userNames=document.querySelector("#userNames")
const hideUsersBtn=document.querySelector("#users_hide")
const button_users=document.querySelector("#users_btn")
const btn_data_show=document.querySelector("#show_data")
const datas=document.querySelector("#datas")

btn_data_show.addEventListener("click", async (event)=>{

    event.preventDefault()
    let user_id
    const user=document.querySelector("#user_txt").value.trim()
    const input_info=document.querySelector("#data_type").value.toLowerCase().trim()
    const data = await( await fetch(prepareURL("users"))).json()
    data.forEach(the_user=>{
        if(the_user.username===user)
            user_id=the_user.id
    })
    const data2 = await( await fetch(prepareURL(`${input_info}?userId=${user_id}`))).json()
    data2.forEach(itr=>addLi(itr.body,datas))
})
button_users.addEventListener("click",async (event)=>{
    event.preventDefault()
    const data = await(await fetch(prepareURL("users"))).json()
    data.forEach( user => addLi(user.username,userNames));
})
hideUsersBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    deleteLi()
})
function addLi(txt,e)
{
    const li=document.createElement("li")
    li.textContent=txt
    li.className="list-group-item"
    e.appendChild(li)
    
}
function deleteLi()
{
    const usersLi=document.querySelectorAll(".list-group-item")
    usersLi.forEach(user =>{
        if(user.parentElement.parentElement.className==="output")
            user.remove()
    })
}
function prepareURL(key)
{
    return `https://jsonplaceholder.typicode.com/${key}`
}
