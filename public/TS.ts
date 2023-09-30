import { getElementById } from './utils.js';
import { PostData } from './utils.js';
const NamesOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

fetch('http://localhost:3000/Info',).then((response) => response.json().then((OutputJson) => {

    let ParsedJSON = JSON.parse(JSON.stringify(OutputJson));

    for (let Day of NamesOfDays) {

        const length = Object.keys(ParsedJSON[Day]).length;

        for (let i = 0; i < length; i++) {

            let task = (ParsedJSON[Day][i]['ASSIGNMENT']);

            const DayList = getElementById(`${Day}Items`);

            const li = document.createElement('li');
            const SubTag = document.createElement('button');

            SubTag.textContent = task;
            SubTag.classList.add('button');

            li.appendChild(SubTag);
            DayList.appendChild(li);


            if (ParsedJSON[Day][i]['DONE'] == 1) {
                SubTag.classList.toggle('button')
                SubTag.classList.toggle('strikethrough')
            }

            SubTag.addEventListener('click', () => {

                console.log(`Button Pressed: ${task}`)


                SubTag.classList.toggle('button')
                SubTag.classList.toggle('strikethrough')


                if (SubTag.classList.contains('strikethrough')) {

                    console.log('strikethrough')

                    let Item = [{
                        Day: Day,
                        Assignment: task,
                        Done: 1
                    }]

                    let ItemString = JSON.stringify(Item)

                    console.log(`Json Sent: ${ItemString}`)

                    PostData(ItemString).then((response) => {
                        console.log(response)
                    })

                } else {
                    console.log('button')

                    let Item = [{
                        Day: Day,
                        Assignment: task,
                        Done: 0
                    }]

                    let ItemString = JSON.stringify(Item)

                    console.log(`Json Sent: ${ItemString}`)

                    PostData(ItemString).then((response) => {
                        console.log(response)
                    })
                }

            })

        }
    }
}))