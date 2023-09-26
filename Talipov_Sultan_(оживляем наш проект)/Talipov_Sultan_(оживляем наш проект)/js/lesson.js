

const phoneInput = document.querySelector('#phone_input')
const phoneCheck = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')


const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneCheck.onclick = () => {
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color='green'
    }else{
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color='red'
    }

}

//TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) =>{
        item.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (index=0) => {
        tabContent[index].style.display = 'block'
        tabs[index].classList.add('tab_content_item_active')
    }
hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')){
        tabs.forEach((item, i) =>{
            if(item === event.target){
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}

  const slideItems = document.querySelectorAll('.tab_content_block');
  const tabContentItems = document.querySelectorAll('.tab_content_item');

  let currentSlideIndex = 0;

  function showSlide(index) {
    slideItems.forEach(item => item.style.display = 'none');
    tabContentItems.forEach(item => item.classList.remove('tab_content_item_active'));
    slideItems[index].style.display = 'block';
    tabContentItems[index].classList.add('tab_content_item_active');
  }

  function nextSlide() {
    currentSlideIndex++
    showSlide(currentSlideIndex);
    if(currentSlideIndex===4){
        currentSlideIndex=-1
    }
  }
  setInterval(nextSlide, 3000);
const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const converter = (element, target, target2, isTrue, checkerEur) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) {
                throw new Error('Failed to fetch conversion data');
            }
            const data = await response.json();

            if (checkerEur === 1) {
                target.value = (element.value * data.eur).toFixed(2);
                target2.value = (1.0797 * element.value).toFixed(2);
            } else if (isTrue) {
                target.value = (element.value / data.usd).toFixed(2);
                target2.value = (element.value / data.eur).toFixed(2);
            } else {
                target.value = (element.value * data.usd).toFixed(2);
                target2.value = (element.value * data.usdToEur).toFixed(2);
            }

            if (element.value === '') {
                target.value = '';
            }
            if (target.value === '') {
                target2.value = '';
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
};
converter(som,usd,eur, true)
converter(usd,som,eur, false)
converter(eur,som,usd, false,1)

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
let currentCardNumber = 1;

const updateCard = async (cardNumber) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`);
        if (!response.ok) {
            throw new Error('Failed to fetch card data');
        }
        const data = await response.json();
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'};">${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('An error occurred:', error);
    }
};


const goToPrevCard = () => {
    currentCardNumber = currentCardNumber === 1 ? 200 : currentCardNumber - 1;
    updateCard(currentCardNumber);
};

const goToNextCard = () => {
    currentCardNumber = currentCardNumber === 200 ? 1 : currentCardNumber + 1;
    updateCard(currentCardNumber);
};

btnPrev.onclick = goToPrevCard;
btnNext.onclick = goToNextCard;
updateCard(currentCardNumber)
const url = 'https://jsonplaceholder.typicode.com/posts';

const fetchData = async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

fetchData()