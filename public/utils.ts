import fetch from 'node-fetch';


export function getElementById(id) {
    return document.getElementById(id);
}


export async function PostData(Item:any){

    const dataToSend = {
        Item
    }

    const response = await fetch('http://localhost:3000/Post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)  // Convert data to JSON string
    });

    const responseData = await response.json();
    console.log(responseData.status);
}
