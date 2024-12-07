let subject = document.getElementById("input_field2");
let search = document.getElementsByClassName("input_field")[0];
let question = document.getElementById("questioning_area");
let array = [];
let eletoremove = 0;
let id_sequence = localStorage.getItem('id_sequence') ? parseInt(localStorage.getItem('id_sequence')) : 1;

let submitBtn = document.querySelector(".submit");
let question_area = document.getElementById("collection_area");
let section2 = document.getElementsByClassName("sub_section")[0];

let paragraph3 = document.getElementsByClassName("para3")[0];
let paragraph4 = document.getElementsByClassName("para4")[0];
let response_section = document.getElementsByClassName("response_area")[0];
let subject_text = "";
let question_text = "";
let index = -1;
let count1 = 0;
let count2 = 0;
let stateOfStar = 1;
let responseSubmitted = document.getElementById("solution");
let submittedResponseArea = document.getElementsByClassName("response_collection")[0];
let responseSubmitButton = document.getElementsByClassName("submit_response")[0];
let parentDivId =0
let nameOfResponser = document.getElementsByClassName("name_field")[0];
let solutionOfProblem = document.getElementById("solution");

let resolveBtn = document.getElementsByClassName("btn3")[0];

resolveBtn.addEventListener("click", () => {
    let localArray = getLocalList()||[];
    localArray.splice(index,1);
    response_section.style.display = "none";
    section2.style.display = "block";
    updateLocalStorage(localArray);

    question_area.removeChild(eletoremove);
})

search.addEventListener("input", () => {
    let value = search.value.toUpperCase();
    let itemToSearch = question_area.children;
    for(let i=0;i<itemToSearch.length;i++)
    {
        let child1 = itemToSearch[i].childNodes[0];
        let child2 = itemToSearch[i].childNodes[1];
        
        let child1InnerText = child1.innerText;
        let child2InnerText = child2.innerText;
        if(child1InnerText.toUpperCase().indexOf(value)>-1||child2InnerText.toUpperCase().indexOf(value)>-1){
            itemToSearch[i].style.display = "block";
        }
        else{
            itemToSearch[i].style.display = "none";
        }
    }
})

function add_star(divElem) {
    const star = document.createElement("i");
    star.classList.add("fa-regular", "fa-star");
    divElem.style.position = "relative";
    star.setAttribute("id", "star_icon");
    divElem.appendChild(star);

    let array1 = getLocalList();
    let parentDiv = divElem.closest(".parent_div");
    let parentDivId = parseInt(parentDiv.id);
    let index1 = find_indexOfArray(parentDivId);

    // if (index1 != -1) {
    //     if (array1[index1].question_star) {
    //         star.style.color = "orange";
    //         parentDiv.style.order = "-1";
    //     } else {
    //         star.style.color = "black";
    //         parentDiv.style.order = "0";
    //     }
    // }

    star.addEventListener("click", (e) => {
        e.stopPropagation();
        if(e.target.tagName === "I"){
            let array1 = getLocalList();
            let index = find_indexOfArray(parentDivId);

            if (index != -1) {
                if (array1[index].question_star) {
                    array1[index].question_star = false;
                    star.style.color = "black";
                    parentDiv.style.order = "0";
                    let element = array1.splice(index,1)[0];
                    array1.push(element);
                    question_area.appendChild(parentDiv);
                } 
                else {
                    array1[index].question_star = true;
                    star.style.color = "orange";
                    parentDiv.style.order = "-1";
                    let temp = array1.splice(index, 1)[0];
                    // array1.unshift(temp);

                    question_area.insertBefore(parentDiv, question_area.firstChild);
                }
                updateLocalStorage(array1);
            }
        }
    });
}

submitBtn.addEventListener("click", () =>{ 
    if(subject.value.trim()==''&&question.value.trim()=='')
    {
        alert("Enter input field first");
    }
    let localeStorageArray = JSON.parse(localStorage.getItem("discussion"))||[];
    const responseObj = {
        id:id_sequence,
        ques_tion:question.value,
        subj_ject:subject.value,
        question_star:false,
        response: [],
        timestamp: new Date().toLocaleString()
    };
    
    if(subject.value.trim()!=''&&question.value.trim()!='')
    {
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("parent_div");
        parentDiv.id = id_sequence;

        const divElem = document.createElement("h3");
        divElem.classList.add("collection");
        divElem.innerText = subject.value;
        parentDiv.appendChild(divElem);
        add_star(divElem);

        const questionDiv = document.createElement("p");
        questionDiv.classList.add("quest");
        questionDiv.innerText = question.value;
        parentDiv.appendChild(questionDiv);

        const timestampDiv = document.createElement("p");
        timestampDiv.classList.add("timestamp");
        timestampDiv.innerText = `Submitted on: ${responseObj.timestamp}`;
        parentDiv.appendChild(timestampDiv);

        question_area.appendChild(parentDiv);
        id_sequence++;
        localStorage.setItem('id_sequence', id_sequence);
        localeStorageArray.push(responseObj);
        array.push(responseObj);
        localStorage.setItem("discussion",JSON.stringify(localeStorageArray));
    }
    
    subject.value = "";
    question.value = "";
})

function getLocalList(){
    return JSON.parse(localStorage.getItem("discussion"));
}

let localList = getLocalList()||[];

let state=0;
let newFormBtn = document.getElementsByClassName("new_form")[0];
newFormBtn.addEventListener("click",() => {
    if(state==0){
        section2.style.display = "block";
        response_section.style.display = "none";
    }

    subject.value = "";
    question.value = "";
})

function find_indexOfArray(parentDivId){
    let array = getLocalList() || [];
    return array.findIndex(curElem => curElem.id == parentDivId);
}

question_area.addEventListener("click",(e) =>{

    submittedResponseArea.innerHTML = "";
    submittedResponseArea.style.display = "none"
    array = getLocalList();

    let parentDiv = e.target.closest(".parent_div");
    // console.log(parentDiv);

    if(e.target.parentNode.tagName=="DIV" && e.target.parentNode.classList.contains("parent_div"))
    {
        eletoremove = e.target.parentNode;
        section2.style.display = "none";
        response_section.style.display = "block";
    }

    parentDivId = parentDiv.id;
    parentDivId = parseInt(parentDivId);
    index = find_indexOfArray(parentDivId)

    paragraph3.innerText = e.target.parentNode.childNodes[0].innerText;
    paragraph4.innerText = e.target.parentNode.childNodes[1].innerText;

    // console.log(array[index].response.length);
    
    if(index!=-1&&array[index].response.length>=1)
    {
        let sub_array = array[index].response;
        submittedResponseArea.innerHTML="";
        // console.log(sub_array);
        sub_array.forEach((curElem) => {
            submittedResponseArea.style.display = "block";
            add_question(curElem,array);
        })
    }
})

function add_question(curElem,array){
    
    const responseDiv = document.createElement("div");
    responseDiv.classList.add("response_sub");
    submittedResponseArea.appendChild(responseDiv);
        
    const responserName = document.createElement("p");
    responserName.classList.add("name");
    responserName.innerText = curElem.name;
    responseDiv.appendChild(responserName);

    const solution_suggested = document.createElement("p");
    solution_suggested.classList.add("sol");
    solution_suggested.innerText = curElem.sol;
    responseDiv.appendChild(solution_suggested);

    //to understand it take reference of like and dislike button.html file 
    add_likeDislikeBtn(responseDiv,curElem,array);
}

function add_likeDislikeBtn(responseDiv,curElem,array){
    const div1 = document.createElement("div");
    div1.classList.add("buttons");
    responseDiv.appendChild(div1);

    const div2 = document.createElement("div");
    div2.classList.add("like");
    div1.appendChild(div2);

    const item1 = document.createElement("i");
    item1.classList.add("fa-regular","fa-thumbs-up");
    div2.appendChild(item1);
    item1.setAttribute("id","like1");

    const item2 = document.createElement("p");
    item2.classList.add("likeCount");
    item2.innerText = curElem.like;
    div2.appendChild(item2);

    const div3 = document.createElement("div");
    div3.classList.add("dislike");
    div1.appendChild(div3);

    const item4 = document.createElement("i");
    item4.classList.add("fa-regular","fa-thumbs-down");
    div3.appendChild(item4);
    item4.setAttribute("id","dislike1");

    const item5 = document.createElement("p");
    item5.classList.add("dislikeCount");
    item5.innerText = curElem.dislike;
    div3.appendChild(item5);

    item1.addEventListener("click", () => {
        item1.style.color = "blue";
        item4.style.color = "black";
        item2.innerText = parseInt(item2.innerText) + 1;
        count1 = item2.innerText;
        curElem.like = item2.innerText;
        // console.log(array);
        curElem.diff = curElem.like - curElem.dislike;
        sortResponses(array);  
        updateLocalStorage(array);

        updateResponsesDisplay(array);
    });
        
    item4.addEventListener("click", () => {
        item4.style.color = "blue";
        item1.style.color = "black";
        item5.innerText = parseInt(item5.innerText) + 1;
        count2 = item5.innerText;
        curElem.dislike = item5.innerText;
        curElem.diff = curElem.like - curElem.dislike;
        sortResponses(array);
        updateLocalStorage(array);

        updateResponsesDisplay(array);
    });
}

const addDynamicElement = (curElem) =>{
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent_div");
    parentDiv.setAttribute("id",curElem.id);

    const divElem = document.createElement("h3");
    divElem.classList.add("collection");
    divElem.innerText = curElem.subj_ject;
    parentDiv.appendChild(divElem);
    add_star(divElem);

    const questionDiv = document.createElement("p");
    questionDiv.classList.add("quest");
    questionDiv.innerText = curElem.ques_tion;
    parentDiv.appendChild(questionDiv);

    const timestampDiv = document.createElement("p");
    timestampDiv.classList.add("timestamp");
    timestampDiv.innerText = `Submitted on: ${curElem.timestamp}`;
    parentDiv.appendChild(timestampDiv);

    question_area.appendChild(parentDiv);
}

const show_QuestionList = () =>{
    let arr = getLocalList()||[];
    arr.forEach((curElem) => {
        addDynamicElement(curElem);
    });
}

show_QuestionList();

function sortResponses(array) {
    array.forEach(item => {
        item.response.sort((a, b) => (b.like - b.dislike) - (a.like - a.dislike));
    });
    updateLocalStorage(array);
}

function updateResponsesDisplay(array) {
    submittedResponseArea.innerHTML = "";

    array[index].response.forEach(curElem => {
        add_question(curElem, array);
    });
}

responseSubmitButton.addEventListener("click", () => {
    
    submittedResponseArea.style.display = "block";
    const responseDiv = document.createElement("div");
    responseDiv.classList.add("response_sub");
    // responseDiv.innerText = responseSubmitted.value; 
    submittedResponseArea.appendChild(responseDiv);

    const responserName = document.createElement("p");
    responserName.classList.add("name");
    responserName.innerText = nameOfResponser.value;
    responseDiv.appendChild(responserName);

    const solution_suggested = document.createElement("p");
    solution_suggested.classList.add("sol");
    solution_suggested.innerText = solutionOfProblem.value;
    responseDiv.appendChild(solution_suggested);
    
    const resp = {
        name:nameOfResponser.value,
        sol:solutionOfProblem.value,
        like:0,
        dislike:0,
        diff:0
    }

    let localeStorageArray = JSON.parse(localStorage.getItem("discussion"))||[];
    console.log(index);
    
    localeStorageArray[index].response.push(resp);
    array[index].response.push(resp);
    // console.log(array);
    sortResponses(array); 
    add_likeDislikeBtn(responseDiv,resp,array);
    localStorage.setItem("discussion",JSON.stringify(localeStorageArray));
    updateResponsesDisplay(array);

    nameOfResponser.value = "";
    solutionOfProblem.value = "";
});
function updateLocalStorage(updatedArray) {
    localStorage.setItem("discussion", JSON.stringify(updatedArray));
}
