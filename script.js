const taskList = [];
const badList = [];
const hrPerWek = 168;

const handleOnSubmit = e => {
	const frmData = new FormData(e);

	const task = frmData.get("task");
	const hr = +frmData.get("hr");
	if (hr<1){
		return alert("Please enter the positive hours.")

	} 
	const ttlbadhrs=totalbadhours();

	// const ttlbadhrs = badList.reduce((subttl, item) => subttl + item.hr, 0);
	const total = taskList.reduce((subttl, item) => subttl + item.hr, 0)+hr;
	const newTotal=taskList.reduce((subttl1,item1)=>subttl1+item1.hr,0)

	if((total+ttlbadhrs)>hrPerWek)
	{
		return alert(`you have only :${total-newTotal} hours remaining for this week`)
	}

	const obj = {
		task,
		hr,
	};

	taskList.push(obj);
	display();
	totalTaskHours();
};

const display = () => {
	// console.log(taskList);
	let str = "";
	taskList.map((item, i) => {
		str += `
  <tr>
  <td>
    <input type="checkbox" name="" id="" />
    ${item.task}
  </td>
  <td> ${item.hr}hrs</td>
  <td class="text-end">
    <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})">
      <i class="fa-solid fa-trash" title="Delete"></i>
    </button>
    <button class="btn btn-sm btn-warning" onclick="markAsNotBad(${i})">
      <i
        class="fa-solid fa-arrow-right"
        title="Mark as bad list"
      ></i>
    </button>
  </td>
</tr>
  `;
	});

	document.getElementById("task-list").innerHTML = str;
};
const displayBadLists = () => {
	// console.log(taskList);
	let str = "";
	badList.map((item, i) => {
		str += `
  <tr>
  <td>
    <input type="checkbox" name="" id="" />
    ${item.task}
  </td>
  <td> ${item.hr}hrs</td>
  <td class="text-end">
  <button class="btn btn-sm btn-warning" onclick="markAsToDo(${i})">
  <i
	class="fa-solid fa-arrow-left"
	title="Mark as task list"
  ></i>
</button>
    <button class="btn btn-danger btn-sm" onclick="deleteBadItem(${i})">
      <i class="fa-solid fa-trash" title="Delete"></i>
    </button>
    
  </td>
</tr>
  `;
	});

	document.getElementById("bad-list").innerHTML = str;
};

const deleteItem = i => {
	taskList.splice(i, 1);
	display();
	totalTaskHours();
};
const deleteBadItem = i => {
	badList.splice(i, 1);
	displayBadLists();
	totalTaskHours();
	totalbadhours();
};

const totalbadhours = () => {
	 const total = badList.reduce((subttl, item) => subttl + item.hr, 0);

	document.getElementById("totalBadHrs").innerText = total||0;

	return total;
};
const totalTaskHours = () => {
	 const total = taskList.reduce((subttl, item) => subttl + item.hr, 0);
	 const ttlbadhrs=totalbadhours()
	 const ttlHrs= total+ttlbadhrs;

	document.getElementById("totalHours").innerText = ttlHrs;

	console.log(total);
};


const markAsNotBad=i=>
{
	const itm=taskList.splice(i,1);
	display();
	badList.push(itm[0]);

	displayBadLists();
	totalbadhours();
}
const markAsToDo=i=>
{
	const itm=badList.splice(i,1);
	displayBadLists();

	taskList.push(itm[0]);
	display();

	totalTaskHours();
}