const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const searchResults = document.querySelector('#search-results');

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    searchRepositories();
});

function searchRepositories() {
    const query = searchInput.value.trim();
    if (query.length < 3) {
        alert('Название должно содержать более 3 символов.');
        return;
    }

    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = '';
            if (data.items.length === 0) {
                searchResults.innerHTML = 'Результатов не найдено.';
            } else {
                data.items.slice(0, 10).forEach(item => {
                    const li = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = item.html_url;
                    link.setAttribute('target', '_blank');
                    link.textContent = item.name;
                    li.appendChild(link);
                    li.innerHTML += `<br>Stars: ${item.stargazers_count}, Forks: ${item.forks_count}`;
                    searchResults.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error(error);
            searchResults.innerHTML = 'Произошла ошибка при выполнении запроса. Пожалуйста, попробуйте еще раз.';
        });
}