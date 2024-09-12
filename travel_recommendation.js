// declaration des varaibles
const btnreset = document.getElementById('reset');
const btnsearch = document.getElementById('search');



function searchCountries() {
    const query = document.getElementById('query').value;
   // const box = document.createElement('div');
    const resultDiv = document.getElementById('resultat')
  
   resultDiv.innerHTML = '';
   

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if (data) {
                if (typeof query !== 'string') {
                    console.error("La variable 'query' n'est pas une chaîne de caractères.");
                    return [];
                } else {
                    const queryLower = query.toLowerCase();
                    const foundkeys = Object.keys(data).filter(key =>
                        key.toLowerCase().includes(queryLower)
                    );

                    if (foundkeys.length > 0) {
                        const reponses= data[foundkeys];
                        console.log(reponses);
                        reponses.forEach(reponse => {
                            const box = document.createElement('div');
                            box.classList.add('result-box');
                            const result = document.createElement('div');
                            result.classList.add('result-b');

                           
                            //resultDiv.innerHTML += `<h2>${reponse.name}</h2>`;
                            //console.log(reponse);
                            if (reponse.cities && Array.isArray(reponse.cities)) {
                                reponse.cities.forEach(city => {
                                    box.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
                                    box.innerHTML += `<h3>${city.name}</h3>`;
                                    box.innerHTML += `<p>${city.description}</p>`;
                                    
                                });
                            } else {
                                //resultDiv.innerHTML += '<p>Aucune ville disponible pour ce pays.</p>';
                            }
                            box.innerHTML += `<img src="${reponse.imageUrl}" alt='a' >`;
                            box.innerHTML += `<h3 >${reponse.name}</h3>`;
                            box.innerHTML += `<p> ${reponse.description}</p>`;
                            box.innerHTML += `<button href='#' class="visit">Visit</button>`;

                            result.appendChild(box)
                            
                            resultDiv.appendChild(result);
                        });
                    } else {
                        resultDiv.innerHTML = 'Aucun résultat trouvé.';
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Une erreur est survenue lors de la récupération des données.';
        });
    }
    
    //document.getElementById('btnsearch').addEventListener('click', searchCountries);
    
    

  btnsearch.addEventListener('click', searchCountries);

/**la foction de recherche */
/*function search(query, data) {
    if (typeof query !== 'string') {
            console.error("La variable 'query' n'est pas une chaîne de caractères.");
            return [];
        }
    const queryLower = query.toLowerCase();

    const foundkeys = Object.keys(data).filter(key => key.toLowerCase().includes(queryLower));
    return foundkeys;
}*/

function resetResult()
{
    const query = document.getElementById('query').value='';
    const resultt= document.getElementById('resultat');
    resultt.style.display='none';
}
btnreset.addEventListener('click', resetResult);
