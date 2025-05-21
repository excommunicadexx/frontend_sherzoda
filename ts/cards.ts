// Интерфейс для данных карточки
interface CardData {
  card_name: string;
  card_text: string;
  image?: string;
}

// Быстро скрываем прелоадер при загрузке DOM с задержкой 1 секунда
window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000); // 1 секунда
  }
});

// Функция для генерации карточек
function generateCards(cards: CardData[]): void {
  const container = document.getElementById('features-container');

  if (!container) {
    console.error('Элемент с id "features-container" не найден');
    return;
  }

  cards.forEach(card => {
    const cardHTML = `
      <div class="feature" onclick="updateImage('${card.image ?? ''}')">
        <hr class="thick-line">
        <h3>${card.card_name}</h3>
        <p>${card.card_text}</p>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// Получение данных и вызов генерации карточек
fetch('https://jsonplaceholder.typicode.com/comments?_limit=3')
  .then(response => response.json())
  .then((json: any[]) => {
    const cards: CardData[] = json.map((comment, index) => ({
      card_name: `Комментарий от ${comment.name}`,
      card_text: comment.body,
      // image: можно добавить, если появится поле
    }));
    generateCards(cards);
  }); 