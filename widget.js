let selectedOptionGlobal = null;
// Tambahkan Google Fonts ke <head>
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap';
document.head.appendChild(fontLink);

// Tambahkan Tailwind CSS ke <head>
const tailwindLink = document.createElement('link');
tailwindLink.rel = 'stylesheet';
tailwindLink.href = '/src/output.css';
document.head.appendChild(tailwindLink);

const customStyle = document.createElement('style');
customStyle.textContent = `
  .scale-hover {
    transition: transform 0.2s ease-in-out;
  }
  .scale-hover:hover {
    transform: scale(1.05);
  }
            .gradient-bg {
              background-image: -moz-linear-gradient( 90deg, rgb(255,255,255) 0%, rgb(233,236,238) 100%);
              background-image: -webkit-linear-gradient( 90deg, rgb(255,255,255) 0%, rgb(233,236,238) 100%);
              background-image: -ms-linear-gradient( 90deg, rgb(255,255,255) 0%, rgb(233,236,238) 100%);
            }

            .scrollbar-custom::-webkit-scrollbar {
                display: none;
            }
            .transition-all {
                transition-property: all;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transition-duration: 150ms;
            }
            .dropdown-enter {
                opacity: 0;
                transform: scale(0.95);
            }
            .dropdown-enter-active {
                opacity: 1;
                transform: scale(1);
                transition: opacity 100ms ease-out, transform 100ms ease-out;
            }
            .dropdown-leave {
                opacity: 1;
                transform: scale(1);
            }
            .dropdown-leave-active {
                opacity: 0;
                transform: scale(0.95);
                transition: opacity 75ms ease-in, transform 75ms ease-in;
            }
`;
document.head.appendChild(customStyle);


// Data multi bahasa
const translations = {
  id: {
    selectPlaceholder: "Pilih Kebutuhan Anda:",
    buttonText: "Lanjut",
    gridItems: {
      sultan: [
        { name: "Fashagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/fashagriya", img: "/src/img/fashagriya.png" }, 
        { name: "Wangsagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/wangsagriya", img: "/src/img/wangsagriya.png" },
        { name: "Padmagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/padmagriya", img: "/src/img/padmagriya.png" },
        { name: "Sadyagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/sadyagriya", img: "/src/img/sadyagriya.png" }
      ],
      investasi: [
        { name: "Neo Plaza", url: "https://www.podomoropark.com/id/ruko", img: "/src/img/neoplaza.png" },
        { name: "La Plaza", url: "https://www.podomoropark.com/id/laplaza", img: "/src/img/laplaza.png" },
        { name: "Student<br> House", url: "https://www.podomoropark.com/id/cluster/naragriya", img: "/src/img/studenthouse.png" }
      ]
    }
  },
            en: {
                selectPlaceholder: "Choose Your Needs:",
                buttonText: "Go",
                gridItems: {
                    sultan: [
                        { name: "Fashagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/fashagriya", img: "/src/img/fashagriya.png" }, 
                        { name: "Wangsagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/wangsagriya", img: "/src/img/wangsagriya.png" },
                        { name: "Padmagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/padmagriya", img: "/src/img/padmagriya.png" },
                        { name: "Sadyagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/sadyagriya", img: "/src/img/sadyagriya.png" }
                    ],
                    investasi: [
                        { name: "Neo Plaza", url: "https://www.podomoropark.com/en/ruko", img: "/src/img/neoplaza.png" },
                        { name: "La Plaza", url: "https://www.podomoropark.com/en/laplaza", img: "/src/img/laplaza.png" },
                        { name: "Student<br> House", url: "https://www.podomoropark.com/en/cluster/naragriya", img: "/src/img/studenthouse.png" }
                    ]
                }
            }
};

// Dapatkan bahasa dari URL
function getLanguageFromURL() {
  const path = window.location.pathname;
  if (path.includes('/en')) return 'en';
  if (path.includes('/id')) return 'id';
  return 'id';
}

// Inisialisasi widget tanpa Shadow DOM
function initWidget() {
  const lang = getLanguageFromURL();
  const data = translations[lang];
  const container = document.getElementById('widget-container');

  // Masukkan HTML ke dalam container
  container.innerHTML = `
    <div class="widgetContainer">
      <div class="widgetContainer2">
        <div class="optionContainer">
          <div class="optionContainer2">
            <div class="dropdownContainer">
              <div class="relative" id="selectContainer">
                                <!-- Trigger Button -->
                                <button
                                    id="selectButton"
                                    class="dropdownButton gradient-bg"
                                >
                                    <span id="selectedValue" class="dropdownButtonPlaceholder">${data.selectPlaceholder}</span>
                                    <svg id="dropdownIcon" class="dropdownButtonIcon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="24.5px" height="12.5px">
                                    <path fill-rule="evenodd"  stroke="rgb(10, 10, 10)" stroke-width="1px" stroke-linecap="butt" stroke-linejoin="miter" fill="none"
                                    d="M1.529,1.475 L12.271,10.427 L23.013,1.475 "/>
                                    </svg>
                                </button>
                                
                                <!-- Dropdown Options -->
                                <div
                                    id="dropdownMenu"
                                    class="dropdownOptionContainer gradient-bg hidden"
                                >
                                    <!-- Options List -->
                                    <ul id="optionsList" class="dropdownListContainer scrollbar-custom">
                                        <!-- Options will be inserted here by JavaScript -->
                                    </ul>
                                </div>
                            </div>
            </div>
            <button id="go" class="widgetSearchButton">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 24 24" version="1.1">
                <g id="surface1">
                <path style="fill:none;stroke-width:36;stroke-linecap:round;stroke-linejoin:miter;stroke:#fff;stroke-opacity:1;stroke-miterlimit:4;" d="M 280.011393 278.017578 C 339.02832 217.884115 338.310547 121.383464 278.496094 62.127279 C 218.681641 2.871094 122.18099 3.110352 62.605794 62.605794 C 3.110352 122.18099 2.871094 218.681641 62.127279 278.496094 C 121.383464 338.310547 217.884115 339.02832 278.017578 280.011393 L 447.970378 449.964193 M 356.972656 332.967122 L 467.03125 443.025716 L 441.031901 469.025065 L 330.973307 358.966471 " transform="matrix(0.0489796,0,0,0.0489796,0,0)"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div id="grid-container" class="widgetGridContainer hidden">
          <div class="widgetGridContent" id="grid-content"></div>
        </div>
      </div>
    </div>
  `;

  // Tambahkan event
  document.getElementById('go').addEventListener('click', () => {
    // const selected = document.getElementById('dynamic-select').value;
    const selected = selectedOptionGlobal ? selectedOptionGlobal.value : null;
    const gridWrapper = document.getElementById('grid-container');
    const grid = document.getElementById('grid-content');
    gridWrapper.classList.add('hidden');

    if (selected.startsWith('url:')) {
      window.location.href = selected.split('url:')[1];
    } else if (selected.startsWith('grid:')) {
      const type = selected.split(':')[1];
      grid.innerHTML = '';
      translations[lang].gridItems[type].forEach(item => {
        const div = document.createElement('div');
        div.className = 'widgetGridItemContainer';
        div.innerHTML = `
          <div class="widgetGridItem scale-hover">
            <div class="widgetGridItemLeft">
              <h3 class="widgetGridItemText">${item.name}</h3>
            </div>
            <div class="widgetGridItemRight">
              <img src="${item.img}" alt="${item.name}" class="widgetGridItemImage" />
            </div>
          </div>
        `;
        div.addEventListener('click', () => window.location.href = item.url);

        grid.appendChild(div);
      });
      gridWrapper.classList.remove('hidden');
    }
  });
}

// Jalankan widget
initWidget();

// Tambahkan Flowbite CSS dan JS setelah widget di-load
// const flowbiteCSS = document.createElement('link');
// flowbiteCSS.rel = 'stylesheet';
// flowbiteCSS.href = 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css';
// document.head.appendChild(flowbiteCSS);

// const flowbiteJS = document.createElement('script');
// flowbiteJS.src = 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js';
// document.body.appendChild(flowbiteJS);

        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguageFromURL();
            let options = [];
            // Data
            if(lang == 'id'){
              options = [
                  { id: 1, name: "-", value: "url:#", disabled: true},
                  { id: 2, name: "Kemewahan Yang Terjangkau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                  { id: 3, name: "Rumah Harga < 1 Milliar", value: "url:https://www.podomoropark.com/id/cluster/patragriya" },
                  { id: 4, name: "Rumah Harga > 1 Milliar", value: "grid:sultan" },
                  { id: 5, name: "Rumah Pinggir Danau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                  { id: 6, name: "Lahan Siap Bangun", value: "url:https://www.podomoropark.com/id/cluster/dharmapuri" },
                  { id: 7, name: "Pilihan Investasi", value: "grid:investasi" },
                  { id: 8, name: "Lahan Komersial", value: "url:https://www.podomoropark.com/id/commercial" },
                  { id: 9, name: "Fasilitas", value: "url:https://www.podomoropark.com/id/facilities" },
                  { id: 10, name: "Berita & Acara", value: "url:https://www.podomoropark.com/id/article/news" },
              ];
            } else if(lang == 'en') {
              options = [
                  { id: 1, name: "-", value: "url:#", disabled: true},
                  { id: 2, name: "Luxuriously Affordable", value: "url:https://www.podomoropark.com/en/cluster/brahmapuri" },
                  { id: 3, name: "Homes < 1 Billion", value: "url:https://www.podomoropark.com/en/cluster/patragriya" },
                  { id: 4, name: "Homes > 1 Billion", value: "grid:sultan" },
                  { id: 5, name: "Lakeside Homes", value: "url:https://www.podomoropark.com/en/cluster/brahmapuri" },
                  { id: 6, name: "Ready to Build Lot", value: "url:https://www.podomoropark.com/en/cluster/dharmapuri" },
                  { id: 7, name: "Investment Choices", value: "grid:investasi" },
                  { id: 8, name: "Commercial Area", value: "url:https://www.podomoropark.com/en/commercial" },
                  { id: 9, name: "Facilities", value: "url:https://www.podomoropark.com/en/facilities" },
                  { id: 10, name: "News & Events", value: "url:https://www.podomoropark.com/en/article/news" },
              ];
            } else {
              options = [
                  { id: 1, name: "-", value: "url:#", disabled: true},
                  { id: 2, name: "Kemewahan Yang Terjangkau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                  { id: 3, name: "Rumah Harga < 1 Milliar", value: "url:https://www.podomoropark.com/id/cluster/patragriya" },
                  { id: 4, name: "Rumah Harga > 1 Milliar", value: "grid:sultan" },
                  { id: 5, name: "Rumah Pinggir Danau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                  { id: 6, name: "Lahan Siap Bangun", value: "url:https://www.podomoropark.com/id/cluster/dharmapuri" },
                  { id: 7, name: "Pilihan Investasi", value: "grid:investasi" },
                  { id: 8, name: "Lahan Komersial", value: "url:https://www.podomoropark.com/id/commercial" },
                  { id: 9, name: "Fasilitas", value: "url:https://www.podomoropark.com/id/facilities" },
                  { id: 10, name: "Berita & Acara", value: "url:https://www.podomoropark.com/id/article/news" },
              ];
            }


            // State
            // let selectedOption = null;
            let isOpen = false;

            // DOM Elements
            const selectContainer = document.getElementById('selectContainer');
            const selectButton = document.getElementById('selectButton');
            const selectedValue = document.getElementById('selectedValue');
            const dropdownIcon = document.getElementById('dropdownIcon');
            const dropdownMenu = document.getElementById('dropdownMenu');
            const optionsList = document.getElementById('optionsList');

            // Render options
            function renderOptions() {
                optionsList.innerHTML = '';
                
                options.forEach(option => {
                    const li = document.createElement('li');
                    li.className = `dropdownList ${
                        option.disabled ? 'dropdownListDisabled' : 'dropdownListHover'
                    } ${
                        selectedOptionGlobal && selectedOptionGlobal.id === option.id ? 'dropdownListSelected' : ''
                    }`;
                    li.textContent = option.name;
                    
                    if (!option.disabled) {
                        li.addEventListener('click', () => selectOption(option));
                    }
                    
                    optionsList.appendChild(li);
                });
            }

            // Select option
            function selectOption(option) {
                selectedOptionGlobal = option;
                selectedValue.textContent = option.name;
                toggleDropdown();
                updateButtonState();
                renderOptions();
                
                // You can access the selected value anywhere using:
                // selectedOption.name or selectedOption.id
                console.log('Selected:', selectedOptionGlobal);
            }

            // Toggle dropdown
            function toggleDropdown() {
                isOpen = !isOpen;
                
                if (isOpen) {
                    dropdownMenu.classList.remove('hidden');
                    dropdownMenu.classList.add('dropdown-enter', 'dropdown-enter-active');
                    setTimeout(() => {
                        dropdownMenu.classList.remove('dropdown-enter', 'dropdown-enter-active');
                    }, 100);
                } else {
                    dropdownMenu.classList.add('dropdown-leave', 'dropdown-leave-active');
                    setTimeout(() => {
                        dropdownMenu.classList.add('hidden');
                        dropdownMenu.classList.remove('dropdown-leave', 'dropdown-leave-active');
                    }, 75);
                }
                
                dropdownIcon.classList.toggle('rotate-180', isOpen);
            }

            // Update button border color
            function updateButtonState() {
                if (isOpen) {
                    selectButton.classList.add('border-blue-500', 'ring-1', 'ring-blue-500');
                    selectButton.classList.remove('border-gray-300');
                } else if (selectedOptionGlobal) {
                    selectButton.classList.add('border-blue-500');
                    selectButton.classList.remove('border-gray-300', 'ring-1', 'ring-blue-500');
                } else {
                    selectButton.classList.add('border-gray-300');
                    selectButton.classList.remove('border-blue-500', 'ring-1', 'ring-blue-500');
                }
            }

            // Event listeners
            selectButton.addEventListener('click', toggleDropdown);

            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!selectContainer.contains(event.target)) {
                    if (isOpen) {
                        toggleDropdown();
                    }
                }
            });

            // Initial render
            renderOptions();
        });
