document.addEventListener('DOMContentLoaded', function() {
    const moreButtons = document.querySelectorAll('.more-btn');
    const newMoreBtn = document.querySelector('.more-btn[data-section="new"]');
    const bestMoreBtn = document.querySelector('.more-btn[data-section="best"]');
    
    const allSections = document.querySelectorAll('.coffee-section');
    const newSection = allSections[0];
    const bestSection = allSections[1];
    
    let newExpanded = false;
    const newCards = newSection ? newSection.querySelectorAll('.oozy-flip-card') : [];
    
    let bestExpanded = false;
    const bestCards = bestSection ? bestSection.querySelectorAll('.oozy-flip-card') : [];

    const cards = document.querySelectorAll('.oozy-flip-card');
    
    let flippedCard = null;  // 현재 뒤집힌 카드 추적

    function toggleCardFlip(card) {
        const cardInner = card.querySelector('.oozy-flip-inner');

        // 카드가 이미 뒤집혀 있다면 원래 상태로 복원
        if (cardInner.classList.contains('flipped')) {
            cardInner.classList.remove('flipped');
            flippedCard = null;  // 뒤집힌 카드 초기화
        } else {
            // 만약 다른 카드가 뒤집혀 있다면 그 카드를 원래 상태로 복원
            if (flippedCard && flippedCard !== card) {
                flippedCard.querySelector('.oozy-flip-inner').classList.remove('flipped');
            }

            // 현재 카드 뒤집기
            cardInner.classList.add('flipped');
            flippedCard = card;  // 현재 뒤집힌 카드 추적
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', () => toggleCardFlip(card));
    });
    
    function hideCards() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 720) {
            
            newCards.forEach((card, index) => {
                if (index >= 3) {
                    card.style.display = 'none';
                    card.classList.remove('show-more');
                } else {
                    card.style.display = 'block';
                }
            });
            
            
            bestCards.forEach((card, index) => {
                if (index >= 3) {
                    card.style.display = 'none';
                    card.classList.remove('show-more');
                } else {
                    card.style.display = 'block';
                }
            });
            
            
            if (newMoreBtn) newMoreBtn.style.display = 'block';
            if (bestMoreBtn) bestMoreBtn.style.display = 'block';
            
        } else if (screenWidth <= 1024) {
            
            newCards.forEach(card => {
                card.style.display = 'block';
                card.classList.remove('show-more');
            });
            
            bestCards.forEach((card, index) => {
                if (index >= 6) {
                    card.style.display = 'none';
                    card.classList.remove('show-more');
                } else {
                    card.style.display = 'block';
                }
            });
            
            
            if (newMoreBtn) newMoreBtn.style.display = 'none';
            if (bestMoreBtn) bestMoreBtn.style.display = 'block';
            
        } else {
            
            newCards.forEach(card => {
                card.style.display = 'block';
                card.classList.remove('show-more');
            });
            bestCards.forEach(card => {
                card.style.display = 'block';
                card.classList.remove('show-more');
            });
            
            
            if (newMoreBtn) newMoreBtn.style.display = 'none';
            if (bestMoreBtn) bestMoreBtn.style.display = 'none';
        }
        
        
        newExpanded = false;
        bestExpanded = false;
        if (newMoreBtn) newMoreBtn.textContent = '더보기';
        if (bestMoreBtn) bestMoreBtn.textContent = '더보기';
    }
    
    
    if (newMoreBtn) {
        newMoreBtn.addEventListener('click', function() {
            if (!newExpanded) {
                
                if (window.innerWidth <= 720) {
                    newCards.forEach((card, index) => {
                        if (index >= 3) {
                            card.style.display = 'block';
                            card.classList.add('show-more');
                        }
                    });
                }
                newMoreBtn.textContent = '접기';
                newExpanded = true;
            } else {
                
                if (window.innerWidth <= 720) {
                    newCards.forEach((card, index) => {
                        if (index >= 3) {
                            card.style.display = 'none';
                            card.classList.remove('show-more');
                        }
                    });
                }
                newMoreBtn.textContent = '더보기';
                newExpanded = false;
                
                
                const newTitle = document.querySelector('.section-title');
                if (newTitle) {
                    newTitle.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    
    if (bestMoreBtn) {
        bestMoreBtn.addEventListener('click', function() {
            const screenWidth = window.innerWidth;
            
            if (!bestExpanded) {
                
                bestCards.forEach((card, index) => {
                    if (screenWidth <= 720) {
                        if (index >= 3) {
                            card.style.display = 'block';
                            card.classList.add('show-more');
                        }
                    } else if (screenWidth <= 1024) {
                        if (index >= 6) {
                            card.style.display = 'block';
                            card.classList.add('show-more');
                        }
                    }
                });
                bestMoreBtn.textContent = '접기';
                bestExpanded = true;
            } else {
                
                bestCards.forEach((card, index) => {
                    if (screenWidth <= 720) {
                        if (index >= 3) {
                            card.style.display = 'none';
                            card.classList.remove('show-more');
                        }
                    } else if (screenWidth <= 1024) {
                        if (index >= 6) {
                            card.style.display = 'none';
                            card.classList.remove('show-more');
                        }
                    }
                });
                bestMoreBtn.textContent = '더보기';
                bestExpanded = false;
                
                
                const bestTitle = document.querySelectorAll('.section-title')[1];
                if (bestTitle) {
                    bestTitle.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    document.querySelectorAll('.oozy-flip-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('oozy-flipped');
        });
    });
    
    hideCards();
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            hideCards();
        }, 250);
    });
});

window.addEventListener('scroll', function() {
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        if (window.pageYOffset > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    }
});

const topBtn = document.getElementById('topBtn');
if (topBtn) {
    topBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}