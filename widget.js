let selectedOptionGlobal = null;
// Tambahkan Google Fonts ke <head>
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap';
document.head.appendChild(fontLink);

// Tambahkan Tailwind CSS ke <head>
const tailwindLink = document.createElement('link');
tailwindLink.rel = 'stylesheet';
tailwindLink.href = '/widget-baru/src/output.css';
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
                background: linear-gradient(to bottom, #ffffff 0%, #f3f4f6 100%);
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
        { name: "Fashagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/fashagriya", img: "/widget-baru/src/img/fashagriya.png" }, 
        { name: "Wangsagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/wangsagriya", img: "/widget-baru/src/img/wangsagriya.png" },
        { name: "Padmagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/padmagriya", img: "/widget-baru/src/img/padmagriya.png" },
        { name: "Sadyagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/sadyagriya", img: "/widget-baru/src/img/sadyagriya.png" }
      ],
      investasi: [
        { name: "Neo Plaza", url: "https://www.podomoropark.com/id/ruko", img: "/widget-baru/src/img/neoplaza.png" },
        { name: "La Plaza", url: "https://www.podomoropark.com/id/laplaza", img: "/widget-baru/src/img/laplaza.png" },
        { name: "Student<br> House", url: "https://www.podomoropark.com/id/cluster/naragriya", img: "/widget-baru/src/img/studenthouse.png" }
      ]
    }
  },
            en: {
                selectPlaceholder: "Choose Your Needs:",
                buttonText: "Go",
                gridItems: {
                    sultan: [
                        { name: "Fashagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/fashagriya", img: "/widget-baru/src/img/fashagriya.png" }, 
                        { name: "Wangsagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/wangsagriya", img: "/widget-baru/src/img/wangsagriya.png" },
                        { name: "Padmagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/padmagriya", img: "/widget-baru/src/img/padmagriya.png" },
                        { name: "Sadyagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/sadyagriya", img: "/widget-baru/src/img/sadyagriya.png" }
                    ],
                    investasi: [
                        { name: "Neo Plaza", url: "https://www.podomoropark.com/en/ruko", img: "/widget-baru/src/img/neoplaza.png" },
                        { name: "La Plaza", url: "https://www.podomoropark.com/en/laplaza", img: "/widget-baru/src/img/laplaza.png" },
                        { name: "Student<br> House", url: "https://www.podomoropark.com/en/cluster/naragriya", img: "/widget-baru/src/img/studenthouse.png" }
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
    <div class="font-josefin bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <div class="flex flex-row gap-3">
            <div class="relative flex-1">
              <div class="relative" id="selectContainer">
                                <!-- Trigger Button -->
                                <button
                                    id="selectButton"
                                    class="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none transition-all gradient-bg"
                                >
                                    <span id="selectedValue" class="text-gray-700 text-sm font-medium">${data.selectPlaceholder}</span>
                                    <svg id="dropdownIcon" class="w-5 h-5 text-gray-400 transform transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                
                                <!-- Dropdown Options -->
                                <div
                                    id="dropdownMenu"
                                    class="absolute z-10 w-full mt-1 border border-gray-200 rounded-md shadow-lg overflow-hidden gradient-bg hidden"
                                >
                                    <!-- Options List -->
                                    <ul id="optionsList" class="overflow-y-auto scrollbar-custom">
                                        <!-- Options will be inserted here by JavaScript -->
                                    </ul>
                                </div>
                            </div>
            </div>
            <button id="go" class="h-12 px-6 bg-[#08594c] hover:bg-emerald-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-lg font-medium">
              <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="grid-container" class="hidden mx-auto">
          <div class="flex flex-wrap justify-center gap-6 mb-16" id="grid-content"></div>
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
        div.className = 'w-full md:w-[calc(50%-12px)] max-w-md';
        div.innerHTML = `
          <div class="rounded-xl overflow-hidden flex shadow-lg cursor-pointer scale-hover">
            <div class="bg-gradient-to-t from-[#308377] to-[#286E63] text-white p-6 flex flex-col justify-center min-w-[180px]">
              <h3 class="text-xl font-bold">${item.name}</h3>
            </div>
            <div class="flex-grow h-[110px]">
              <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover" />
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
const flowbiteCSS = document.createElement('link');
flowbiteCSS.rel = 'stylesheet';
flowbiteCSS.href = 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css';
document.head.appendChild(flowbiteCSS);

const flowbiteJS = document.createElement('script');
flowbiteJS.src = 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js';
document.body.appendChild(flowbiteJS);

        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguageFromURL();
            let options = [];
            // Data
            if(lang == 'id'){
              options = [
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
                    li.className = `px-4 py-2.5 text-sm transition-colors duration-150 ${
                        option.disabled ? 'text-gray-400 cursor-default' : 'hover:bg-gray-300 cursor-pointer'
                    } ${
                        selectedOptionGlobal && selectedOptionGlobal.id === option.id ? 'bg-blue-50' : ''
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
