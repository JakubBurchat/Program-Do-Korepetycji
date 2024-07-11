DaysOfWeek = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"]
tries = 0
currentView = ""
_generateSummary = false
music = false

AllData = {"students" : Students, "days": Days, "krd":  Krd, "hours": Hours, "price": Price,
 "summarydays": SummaryDays, "summaryhours": SummaryHours, "summaryprofit": SummaryProfit}

var nav = document.getElementById("nav")
nav.innerHTML = nav.innerHTML + '<li id="nav1" onclick="saveToFile()" >Zapisz</li>'
nav.innerHTML = nav.innerHTML + '<li id="nav2" onclick="presentStudents()" >Lista Uczniów</li>'
nav.innerHTML = nav.innerHTML + '<li id="nav3" onclick="addStudentMenu()" >Dodaj Ucznia</li>'
nav.innerHTML = nav.innerHTML + '<li id="nav4" onclick="removeStudentMenu()" >Usuń Ucznia</li>'
nav.innerHTML = nav.innerHTML + '<li id="nav5" onclick="summary()" >Podsumowanie</li>'

presentDayPlan()

function presentDayPlan() {
	if (currentView == "presentStudents" || currentView == "summary") {
		menuExit()
	}
	currentView = "presentDayPlan"
	container = document.getElementById("container")
	container.innerHTML = ""
	nav = document.getElementById("nav2")
	nav.innerHTML = "Lista Uczniów"
	nav.setAttribute("onclick", "presentStudents()") 
	table = ""
	table = table + "<table>"

	table = table + "<tr>"
	for (let i = 0; i<5; i++) {
		table = table + "<th>" + DaysOfWeek[i] + "</th>"
	}
	table = table + "</tr>"

	for(let i = 0; i < 5; i++) {
		table = table + "<tr>"
		for (let j = 0; j < 5; j++) {
			if (Students[Days[j*5+i]-1] != "" && Days[j*5+i] != -1) {
				table = table + '<td onclick="showDetails('+(Days[j*5+i]-1 )+','+(j*5+i)+')">'+Students[Days[j*5+i]-1]+'<br>'+(16+i)+':00</td>'
			} else {
				table = table + '<td onclick="addStudentToLessonMenu('+(j*5+i)+')"></td>'
			}
	   }		
	   table = table + "</tr>"
   }

	table = table + "</table>"

	container.innerHTML = table
}

function presentStudents() {
	menuExit()
	currentView = "presentStudents"
	nav = document.getElementById("nav2")
	nav.innerHTML = "Plan Zajęć"
	nav.setAttribute("onclick", "presentDayPlan()") 
	container = document.getElementById("container")

	table = ""

	table = table + "<table>"

	table = table + "<tr>"

	table = table + "<th>" + "Imie i Nazwisko" + "</th>"
	table = table + "<th>" + "Krd" + "</th>"

	table = table + "</tr>"

	for(let i = 0; i < Students.length; i++) {
		table = table + "<tr>"
		table = table + '<td onclick="showDetails('+i+')">'+Students[i]+'</td><td onclick="showDetails('+i+')">'+Krd[i]+'</td>'
		table = table + "</tr>"
	}

	table = table + "</table>"

	container.innerHTML = table
}

function showDetails(id, day) {
	menuExit()
	menu = document.getElementById("showMenu")
	document.getElementById("selectMenu").innerHTML = ""
	menu.style.textAlign = "center"
	menu.style.border = " solid "
	menu.innerHTML = '<div class="Xbutton" onclick="menuExit()">X  </div>\
		<p>'+Students[id]+'</p>\
		<p>Krd: '+Krd[id]+'</p>'
		if (currentView == "presentDayPlan") {
			menu.innerHTML = menu.innerHTML + '<div onclick="addStudentToLesson(-2,'+day+')" class="freeLesson">Zwolnij Godzinę</div>'
		}
		menu.innerHTML = menu.innerHTML + '<div onclick=changeKrd("1",'+id+','+day+') class="changeValueButton">+</div>\
		<div onclick=changeKrd("-1",'+id+','+day+') class="changeValueButton">-</div>\
		<div onclick=changeKrd("0",'+id+','+day+') class="changeValueButton">0</div>'
		 for(let i = 0; i < 5; i++) {
			 for (let j = 0; j < 5; j++) {
				 if (Days[i*5+j] == id+1) {
					 if (i*5+j == day) {
						 menu.innerHTML = menu.innerHTML + '<p>>'+DaysOfWeek[i]+''+(16+j)+':00<</p>'
					 } else {
						 menu.innerHTML = menu.innerHTML + '<p>'+DaysOfWeek[i]+''+(16+j)+':00</p>'
					 }
				 } 
			}
		}
}

function changeKrd(change, id, day) {
	switch (change) {
		case "-1":	
			Krd[id] = Krd[id] - 1
			break;
		case "1":	
			Krd[id] = Krd[id] + 1
			break;
		case "0":	
			Krd[id] = 0
			break;
	}
	showDetails(id, day)
	if (currentView == "presentStudents") {
			presentStudents()
	}
}

function addStudentToLessonMenu(lesson) {
	menuExit()
	selectMenu = document.getElementById("selectMenu")
	selectMenu.innerHTML = ""
	selectMenu.style.border = " solid "
	selectMenu.innerHTML = selectMenu.innerHTML + 
	'<div class="XbuttonSelect" onclick="menuExit()">X  </div>\
	<ul id="Slist0"></ul>\
	<ul id="Slist1"></ul>\
	<ul id="Slist2"></ul>'
	
	for (let k = 0; k < 3; k++) {
		list = document.getElementById('Slist'+k+'')
		for (let i = k*12; i < 12 + k*12 && i < Students.length; i++) {
			list.innerHTML = list.innerHTML + '<li onclick=addStudentToLesson('+i+','+lesson+')>'+Students[i]+'</li>'
		}
	}
}


function addStudentToLesson(id, lesson) {
	Days[lesson] = id + 1
	menuExit()
	presentDayPlan()
}

function addStudentMenu() {
	menuExit()
	tries = 0
	menu = document.getElementById("showMenu")
	menu.style.border = " solid "
	menu.style.textAlign = "right"
	menu.innerHTML = '<div class="Xbutton" onclick="menuExit()">X  </div>\
		<p>Imie: <input type="text" id="fname" name="fname"></input></p>\
		<p>Nazwisko: <input type="text" id="sname" name="sname"></input></p>\
		<div onclick="addStudent()" class="submit">Dodaj</div>'
}

function removeStudentMenu() {
	menuExit()
	selectMenu = document.getElementById("selectMenu")
	selectMenu.style.border = " solid "
	selectMenu.innerHTML = ""
	selectMenu.innerHTML = selectMenu.innerHTML + 
	'<div class="XbuttonSelect" onclick="menuExit()">X  </div>\
	<ul id="Slist0"></ul>\
	<ul id="Slist1"></ul>\
	<ul id="Slist2"></ul>'
	
	for (let k = 0; k < 3; k++) {
		list = document.getElementById('Slist'+k+'')
		for (let i = k*12; i < 12 + k*12 && i < Students.length; i++) {
			list.innerHTML = list.innerHTML + '<li onclick=removeStudent('+i+')>'+Students[i]+'</li>'
		}
	}
}

function removeStudent(id) {
	 for (let i = 0; i < Days.length; i++) {
		 if (Days[i] == (id+1)) {
			Days[i] = -1
		 }
		 if (Days[i] > (id + 1)) {
			Days[i] = Days[i] - 1
		 }
	 }
	 
	Krd.splice(id, 1)
	Students.splice(id, 1)
	
	if (currentView == "presentStudents") {
		presentStudents()
	}
	if (currentView == "presentDayPlan") {
		presentDayPlan()
	}
	menuExit()
}

function addStudent() {
	menu = document.getElementById("showMenu")
	fname = document.getElementById("fname")
	sname = document.getElementById("sname")
	if (fname.value != "" && sname.value != "") {
		Students.push(fname.value + " " + sname.value)
		Krd.push(0)
		menuExit()
		if (currentView == "presentStudents") {
			presentStudents()
		}
	} else if (tries == 0){
		menu.innerHTML = menu.innerHTML + "<p>Niepoprawne dane</p>"
		tries = tries + 1
	}
}

function menuExit() {
		menu = document.getElementById("showMenu")
		menu.innerHTML = ""
		menu.style.border = "0px none"
		menu = document.getElementById("selectMenu")
		menu.innerHTML = ""
		menu.style.border = "0px none"
}

function summary() {
	if (currentView == "presentDayPlan" || currentView == "presentStudents") {
		menuExit()
	}
	currentView = "summary"
	document.getElementById("container").innerHTML = '<ul id="List"></ul>'
	list = document.getElementById("List")
	list.innerHTML = '<div class="ButtonPlus" onclick="addHours(1)">+</div>\
		<div class="ButtonMinus" onclick="addHours(-1)">-</div>\
		<li class="SummaryHours">Obecne Godziny: '+Hours+'</li>'
	list.innerHTML = list.innerHTML +
		'<div class="ButtonPlus" onclick="addPrice(1)" style="margin-left: 60vw; margin-top: 0.8vh;"">+</div>\
		<div class="ButtonMinus" onclick="addPrice(-1)" style="margin-left: 65vw; margin-top: 0.8vh;">-</div>\
		<li class="SummaryHours">Obecna Stawka: '+Price+'</li>'
	list.innerHTML = list.innerHTML + 
		'<li id="generateSummary" onclick="generateSummary()" style="width: 70vw;">Generuj  podsumowanie</li>'
	for(let i = 0; i < SummaryDays.length; i++) {
		list.innerHTML = list.innerHTML + 
		'<li class="Summary">'+SummaryDays[i][0]+'.'+SummaryDays[i][1]+'.'+SummaryDays[i][2]+' | Zysk: '+SummaryProfit[i]+'\
			| Godziny: '+SummaryHours[i]+'</li>';
	}
}

function generateSummary() {
	var timeout
	if (_generateSummary) {
		const date = new Date();
		SummaryDays.push([date.getDate(), date.getMonth()+1, date.getFullYear()])
		SummaryHours.push(Hours)
		SummaryProfit.push(Hours * Price)
		Hours = 0
		_generateSummary = false
		summary()
	} else {
		text = document.getElementById("generateSummary")
		text.innerHTML = "Generuj  podsumowanie, czy na pewno?"
		_generateSummary = true
		setTimeout(resetSummary, 1000)
	}
}

function resetSummary() {
	text = document.getElementById("generateSummary")
	text.innerHTML = "Generuj  podsumowanie"
	_generateSummary = false
}

function addHours(change) {
	Hours = Hours + change
	summary()
}

function addPrice(change) {
	Price = Price + change
	summary()
}

function saveToFile() {
	var a = document.createElement("a");
	var content = ""
	
	content = content + "Students = [ "
	for (let i = 0; i < Students.length; i++) {
		content = content + '"'+Students[i]+'"'
		if (i < Students.length - 1) {
			content = content + ", "
		}
	}
	content = content + " ]\n\n"
	
	content = content + "Days = [ "
	for (let i = 0; i < Days.length; i++) {
		content = content + ''+Days[i]+''
		if (i < Days.length - 1) {
			content = content + ", "
		}
	}
	content = content + " ]\n\n"
	
	content = content + "Krd = [ "
	for (let i = 0; i < Krd.length; i++) {
		content = content + ''+Krd[i]+''
		if (i < Krd.length - 1) {
			content = content + ", "
		}
	}
	content = content + " ]\n\n"
	
	content = content + "Hours = " + Hours
	content = content + "\n\n"
	
	content = content + "Price = " + Price
	content = content + "\n\n"
	
	content = content + "SummaryDays = [ "
	for (let i = 0; i < SummaryDays.length; i++) {
		content = content + "[ " + SummaryDays[i][0]  + ", " + SummaryDays[i][1] + ", " + SummaryDays[i][2]+ " ]"
		if (i < SummaryDays.length - 1) {
			content = content + ", "
		}
	}
	content = content + " ]\n\n"
	
	content = content + "SummaryProfit = [ "
	for (let i = 0; i < SummaryProfit.length; i++) {
		content = content + ''+SummaryProfit[i]+''
		if (i < SummaryProfit.length - 1) {
			content = content + ", "
		}
	}
	content = content + " ]\n\n"
	
	content = content + "SummaryHours = [ "
	for (let i = 0; i < SummaryHours.length; i++) {
		content = content + ''+SummaryHours[i]+''
		if (i < SummaryHours.length - 1) {
			content = content + ", "
		}
	}
	content = content + " ]\n\n"
	
	a.href = window.URL.createObjectURL(new Blob([""+content+""], {type: "text/plain"}));
	a.download = "plan.txt";
	a.click();
}
