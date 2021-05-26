const missingImageUrl = 'https://tinyurl.com/tv-missing'

/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  
  const shows = response.data.map(result => {
    // show is entering into the api like this (response.data.show) is connecting with the shows function.
    const show = result.show;
    return  {
        id: show.id,
        name: show.name,
        summary: show.summary,
        image: show.image ? show.image.medium : missingImageUrl,
      };
  });
  return shows;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {

  for (let show of shows) {
    const showsList = document.getElementById('shows-list')
    const item = document.createElement('div');
    item.className = 'item'
    item.setAttribute('id', show.id);
    const card = document.createElement('div')
    card.setAttribute('id', show.id)
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body')
    const showName = document.createElement('h5')
    showName.setAttribute('class', 'card-title')
    showName.innerHTML = show.name;
    const cardText = document.createElement('p');
    cardText.setAttribute('class', 'card-text')
    cardText.innerHTML = show.summary;

    showsList.appendChild(item)
    item.appendChild(card)
    card.appendChild(cardBody)
    cardBody.appendChild(showName)
    cardBody.appendChild(cardText)
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
const form = document.getElementById('search-form')
const searchQuery = document.getElementById('search-query')

form.addEventListener("submit", async function handleSearch (evt) {
  evt.preventDefault();

  const query = searchQuery.value;
  if (!query) return;

 const episodeArea = document.getElementById('episodes-area')
 episodeArea.style.display = 'none';

  const shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const episodeUrl = `http://api.tvmaze.com/shows/${id}/episodes`
  console.log(episodeUrl)

  // TODO: return array-of-episode-info, as described in docstring above
}

// function populateEpisodes() {
// }