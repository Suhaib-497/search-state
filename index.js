const search=document.getElementById('search');
const matchlist=document.getElementById('match-list');


const searchstates=async searchText =>{
const res=await fetch('data/state.json');
const states=await res.json();

// get match to current text input

let matches=states.filter(state =>{
    const regex=new RegExp(`^${searchText}`, 'gi');
    
    return state.name.match(regex) || state.abbr.match(regex);

});

if (searchText.length ===0){
    matches= [];
    matchlist.innerHTML='';

}

outputHtml(matches);

};

const outputHtml= matches =>{
    if(matches.length>0){
        const html = matches.map(match=> 
            `
            <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat} /Long: ${match.long}</small>
            </div>

            `).join('');

        matchlist.innerHTML = html;
                
    }
}

search.addEventListener('input', () =>searchstates(search.value));



