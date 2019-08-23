let tab, tabContent, arrEye;

window.onload = function() {
    tab = document.getElementsByClassName('tab');
    tabContent = document.getElementsByClassName('tab-content');
    arrEye = document.getElementsByClassName('eye');
    hideTabContentFrom(1);
    initTabs();

    for (let i = 0; i < arrEye.length; i++) {
        arrEye[i].onclick = function(event) {
            const input = document.getElementById(event.target.id);
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        }
    }
    document.querySelector('.menu').onclick = function() {
        let menuList = document.querySelector('.menu-list');
        if (menuList.classList == 'menu-list') {
            menuList.classList.add('active');
        } else {
            menuList.classList.remove('active');
        }
    }
}


function hideTabContentFrom(index) {
    for (let i = index; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('active');
    }
}

function initTabs() {
    if (document.querySelector('.tabs')) {
        document.querySelector('.tabs').onclick = function(event) {
            const target = event.target;
            if (target.className == 'tab') {
                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        showTabContent(i);
                    }
                }
            }
        }
    }
}


function showTabContent(position) {
    if (tabContent[position].classList.contains('hide')) {
        hideTabContentFrom(0);
        tab[position].classList.add('active');
        tabContent[position].classList.remove('hide');
        tabContent[position].classList.add('show');
    }
}

//Timer for registration
const sendCode = document.querySelectorAll('.send-code');
for (let i = 0; i < sendCode.length; i++) {
    sendCode[i].onclick = function(event) {
        const target = event.target;
        let seconds = 60;

        if (target.classList.value !== 'button active' && target.classList.value !== 'button active shake') {
            target.classList = 'button active';

            var seconds_timer_id = setInterval(function() {
                if (seconds > 0) {
                    seconds--;
                    if (seconds < 10) {
                        seconds = "0" + seconds;
                    }
                    target.innerHTML = `Отправить повторно 0:${seconds}`;
                } else {
                    clearInterval(seconds_timer_id);
                    target.innerHTML = `Отправить код`;
                    target.classList = 'button';
                }
            }, 1000);
        } else {
            target.classList = 'button active shake';
            setTimeout(() => {
                target.classList = 'button active';
            }, 1000);
        }
    }
}