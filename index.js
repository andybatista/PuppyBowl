const apiBaseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/`;
const state = {
    allPlayers: [],
}

const main = document.querySelector(`main`);

const getAllPlayers = async () => {
    const response =  await fetch(`${apiBaseURL}/players`);
    const jsonResponse = await response.json();
    state.allPlayers = jsonResponse.data.players;

    renderAllPlayers(state);
    
}

const getPlayerDetails = async (id) => {
    const response = await fetch(`${apiBaseURL}/players/${id}`)
    const responseJson = await response.json ();
    const playerDetails = responseJson.data
    renderDetails(playerDetails);
}

const renderDetails = (detailsofaPlayer) => {
    const html =`
    <div class="playerinfo">
    <h2>${detailsofaPlayer.player.name}</h2>
    <img src="${detailsofaPlayer.player.imageUrl}" alt="image of player" />
    <p> Breed: ${detailsofaPlayer.player.breed}<p>
    <p> Status: ${detailsofaPlayer.player.status}<p>
    <p> ID: ${detailsofaPlayer.player.id}<p>
    <button id="back-button"> Back to All Players </button>
    </div> 
`
    main.innerHTML = html;

    const backButton = document.querySelector(`#back-button`);
    backButton.addEventListener(`click`, () => {
        renderAllPlayers(state);
    });
   
}
    
const init = async () => {
     await getAllPlayers();
}

const renderAllPlayers = (state) => {
    const playerNames = state.allPlayers.map((singlePlayer) => {
        return `<li id="${singlePlayer.id}">${singlePlayer.name}</li>`;

    });

    const ol = document.createElement(`ol`);
    ol.innerHTML = playerNames.join('');
    main.replaceChildren(ol);
    
    const listItems= document.querySelectorAll(`li`);
    listItems.forEach((playerListItem) => {
        playerListItem.addEventListener(`click`, (event) => {
            getPlayerDetails(event.target.id)
        });
        
    });
}
getAllPlayers();

const form = document.querySelector(`form`);
form.addEventListener(`submit`, async (event) => {
    event.preventDefault();

    const nameInput = document.querySelector(`#name`);
    const imageInput = document.querySelector(`#ImageUrl`);
    const breedInput = document.querySelector(`#breed`);
    const statusInput = document.querySelector(`#Status`);
    const idinput = document.querySelector(`#id`);

    const response = await fetch(`${apiBaseURL}players`, {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            name: nameInput.value,
            ImageUrl: imageInput.value,
            breed: breedInput.value,
            Status: statusInput.value,
            id: idinput.valve
        })

    });

    const responseJson = await response.json();
    const newPlayer = responseJson.data;

    state.allPlayers.push(newPlayer);
    renderAllPlayers();

});



