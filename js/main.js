document.addEventListener('DOMContentLoaded', function() {
    // 作品集自動滾動效果
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider .item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let index = 0;

    function showSlide(i) {
        const itemWidth = slides[0].getBoundingClientRect().width;
        if (i + 3 >= slides.length) {
            index = 0; 
        } else if (i < 0) {
            index = slides.length - 1;
        } else {
            index = i;
        }
        slider.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    function nextSlide() {
        showSlide(index + 1);
    }

    function prevSlide() {
        showSlide(index - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 5000); // 每5秒自動播放一次

    // 平滑滾動功能
    document.querySelectorAll('nav a, .cta').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;

            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });

    // 表單驗證與提交邏輯
    const contactForm = document.getElementById('contact-form');
    const subscribeButton = document.getElementById('subscribe-btn');
    
    contactForm.addEventListener('input', function() {
        let allFilled = true;
        contactForm.querySelectorAll('input, textarea, select').forEach(function(input) {
            if (!input.value) allFilled = false;
        });
        subscribeButton.disabled = !allFilled;
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (subscribeButton.disabled) {
            alert('請先填寫完整的聯繫表單！');
        } else {
            alert('您已成功訂閱每日郵件！');
            contactForm.submit();
        }
    });
});
