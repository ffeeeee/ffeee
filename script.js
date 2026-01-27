// 메뉴 데이터
const menuData = {
    korean: ['비빔밥', '설렁탕', '김밥', '돈까스', '제육볶음', '넙치까나리', '부대찌개', '갈비탕', '순두부찌개', '김치찌개'],
    chinese: ['짜장면', '쌀국수', '마라탕', '양장피', '뺑오더', '군만두', '탕수육', '우육면', '마라샹궈', '동파육'],
    japanese: ['돈까스', '우동', '라면', '초밥', '규동', '카레우동', '오코노미야키', '텐동', '타코야끼', '오코노미야키'],
    western: ['파스타', '피자', '스테이크', '셀러드', '리조또', '까르보나라', '풀드포크', '함버거', '시림프파스타', '샌드위치'],
    fast: ['버거', '치킨', '피자', '핫도그', '감자튀김', '라면', '닭볶이', '김밥', '컵라면', '쌍둥이']
};

// 카테고리별 추천 메뉴 반환
function getRecommendedMenu(category) {
    if (category === '' || !menuData[category]) {
        // 모든 카테고리에서 랜덤 선택
        const allMenus = Object.values(menuData).flat();
        return allMenus[Math.floor(Math.random() * allMenus.length)];
    }
    const categoryMenus = menuData[category];
    return categoryMenus[Math.floor(Math.random() * categoryMenus.length)];
}

// 메뉴 추천 메시지
const menuMessages = {
    korean: { emoji: '🥢', text: '한식 추천' },
    chinese: { emoji: '🥡', text: '중식 추천' },
    japanese: { emoji: '🍜', text: '일식 추천' },
    western: { emoji: '🍝', text: '양식 추천' },
    fast: { emoji: '🍔', text: '패스트푸드 추천' },
    random: { emoji: '🍽️', text: '랜덤 추천' }
};

// 카테고리별 여러 메뉴 추천
function getMultipleMenus(category = '') {
    const menus = [];
    for (let i = 0; i < 5; i++) {
        menus.push(getRecommendedMenu(category));
    }
    return menus;
}

// DOM 요소들
const randomBtn = document.getElementById('randomBtn');
const menuBoxes = document.getElementById('menuBoxes');
const darkModeBtn = document.getElementById('darkModeBtn');
const recommendBtn = document.getElementById('recommendBtn');
const categoryInput = document.getElementById('categoryInput');
const menuResult = document.getElementById('menuResult');

// 추천 버튼 클릭 이벤트
recommendBtn.addEventListener('click', function() {
    const category = categoryInput.value;
    const menu = getRecommendedMenu(category);
    const categoryType = category || 'random';
    const message = menuMessages[categoryType] || menuMessages.random;
    
    menuResult.innerHTML = `
        <h3>${message.emoji} ${message.text}</h3>
        <div class="fortune-info" style="text-align: center;">
            <p style="font-size: 24px; font-weight: bold; color: var(--primary-light); margin: 20px 0;">🍽️ ${menu}</p>
            <p style="font-size: 14px; opacity: 0.8;">맛있는 한끼 되세요! 😋</p>
        </div>
    `;
    
    menuResult.classList.add('show');
});

// 엔터키 입력 시 추천받기
categoryInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        recommendBtn.click();
    }
});

// 랜덤 추천 버튼 클릭 이벤트
randomBtn.addEventListener('click', function() {
    menuBoxes.innerHTML = '';
    const menus = getMultipleMenus();
    
    menus.forEach((menu, index) => {
        const box = document.createElement('div');
        box.className = 'lottery-box';
        const color = getRandomColor();
        
        box.innerHTML = `
            <div class="lottery-numbers">
                <div class="menu-item" style="background: linear-gradient(135deg, ${color}, ${color}dd); padding: 20px; border-radius: 8px; width: 100%;">
                    <div style="color: white; font-size: 20px; font-weight: bold;">${menu}</div>
                </div>
            </div>
            <div class="set-number">${index + 1}번 추천</div>
        `;
        
        menuBoxes.appendChild(box);
    });
});

// 다크모드 토글
darkModeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    darkModeBtn.textContent = isDarkMode ? '☀️ 라이트모드' : '🌙 다크모드';
});

// 페이지 로드 시 저장된 다크모드 설정 적용
window.addEventListener('DOMContentLoaded', function() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = '☀️ 라이트모드';
    }
    
    // 초기 로드 시 랜덤 메뉴 생성
    randomBtn.click();
});
