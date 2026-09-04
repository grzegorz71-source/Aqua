const filterBiotop = document.getElementById("filter-biotop");
const biotopeList = document.getElementById("biotope-list");
const biotopeDescription = document.getElementById("biotope-description");
const emptyState = document.getElementById("empty-state");

const modal = document.getElementById("fish-modal");
const modalName = document.getElementById("fish-modal-name");
const modalLatin = document.getElementById("fish-modal-latin");
const modalDesc = document.getElementById("fish-modal-desc");
const modalImg = document.getElementById("fish-gallery-img");
const modalClose = document.getElementById("fish-modal-close");

const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");

let currentGallery = [];
let currentIndex = 0;

const biotopeDescriptions = {
  Amazonia:
    "Amazonia to miękka, kwaśna woda, gęste rośliny i zacienione rzeki.",
  Afryka: "Afrykańskie biotopy obejmują rzeki i jeziora Malawi/Tanganika.",
  Azja: "Azja to przejrzyste rzeki i strumienie, ryby ruchliwe i stadne.",
  "Ameryka Środkowa": "Ciepłe, twardsze wody, dominują żyworódki.",
  "Ameryka Południowa": "Różnorodne rzeki, żyworódki i zbrojniki.",
};

const fishDetailsData = {
  "neon-innesa": {
    name: "Neon Innesa",
    latin: "Paracheirodon innesi",
    desc: "Klasyczna ryba ławicowa z Amazonii.",
    gallery: [
      "img_fish/neon/4604020906_8717b13605_b.jpg",
      "img_fish/neon/neon_innesa_paracheirodon_innesi2-768x768.jpg",
      "img_fish/neon/Paracheirodon_innesi_(aka).jpg",
    ],
  },
  skalar: {
    name: "Skalar",
    latin: "Pterophyllum scalare",
    desc: "Majestatyczna pielęgnica o wysokim ciele.",
    gallery: [
      "img_fish/skalar/skalar-altum-zaglowiec-wysoki-pterophyllum-altum-01.jpg",
      "img_fish/skalar/skalar-altum-zaglowiec-wysoki-pterophyllum-altum-03.jpg",
      "img_fish/skalar/skalar-altum-zaglowiec-wysoki-pterophyllum-altum-04.jpg",
      "img_fish/skalar/skalar-altum-zaglowiec-wysoki-pterophyllum-altum-720x380.jpg",
    ],
  },
  dyskowiec: {
    name: "Dyskowiec",
    latin: "Symphysodon aequifasciatus",
    desc: "Jedna z najpiękniejszych ryb akwariowych.",
    gallery: [
      "img_fish/dyscus/1920X864-paletki.jpg",
      "img_fish/dyscus/images.jpg",
      "img_fish/dyscus/leopard3-w-fry-466x700.jpg",
      "img_fish/dyscus/paletka.jpg",
    ],
  },

  Zbrojnik_niebieski: {
    name: "Zbrojnik niebieski (glonojad)",
    latin: "Ancistrus sp.",
    desc: "Ryba akwariowa, która nie koniecznie zjada glony 😊.",
    gallery: [
      "img_fish/zbojnik/Ancistrus sp1.jpg",
      "img_fish/zbojnik/zbrojnik-glonojad-ryba-akwariowa-zbrojniki-glonojady-ryby-akwariowe1-720x380.jpg",
      "img_fish/zbojnik/Zbrojnik-pospolity-shutterstock_1467060941-scaled.webp",
    ],
  },

  "pielegnica pawiooka": {
    name: "Pielęgnica pawiooka",
    latin: "Astronotus ocellatus",
    desc: "Majestatyczna pielęgnica z Ameryki Południowej.",
    gallery: [
      "img_fish/pawiooka/Astronotus_ocellatus_2010_G1.jpg",
      "img_fish/pawiooka/download-2-1.jpg",
    ],
  },

  "barwniak-szmaragdowy": {
    name: "Barwniak szmaragdowy",
    latin: "Pelvicachromis taeniatus",
    desc: "Spokojna pielęgnica z Afryki Zachodniej.",
    gallery: [
      "img_fish/barwniak/barwniak_szmaragdowy_nigeria_red_pelvicachromis_taeniatus-i-41919-1-950.webp",
      "img_fish/barwniak/images.jpg",
    ],
  },
  muszlowiec: {
    name: "Muszlowiec",
    latin: "Neolamprologus multifasciatus",
    desc: "Mała pielęgnica z jeziora Tanganika.",
    gallery: [
      "img_fish\\muszlowiec\\Lamprologusstappersimalemcl.jpg",
      "img_fish\\muszlowiec\\Muszlowce-jeziora-Tanganika.jpg",
    ],
  },
  "danio-pregowany": {
    name: "Danio pręgowany",
    latin: "Danio rerio",
    desc: "Odporna ryba ławicowa.",
    gallery: [
      "img_fish\\danio\\Kerabat_Ikan_Zebra.webp",
      "img_fish\\danio\\thumb2308-danio-pregowane-86ea7a764a057d8e45d8e4b46410e5e5.webp",
    ],
  },
  platka: {
    name: "Platka",
    latin: "Xiphophorus maculatus",
    desc: "Kolorowa żyworódka.",
    gallery: [
      "img_fish\\platka\\main-l_m.webp",
      "img_fish\\platka\\Zmieniak-plamisy-2.webp",
      "img_fish\\platka\\zmienniak-plamisty-platka-ryba-akwariowa.jpg",
    ],
  },
  gupik: {
    name: "Gupik",
    latin: "Poecilia reticulata",
    desc: "Kolorowa żyworódka.",
    gallery: [
      "img_fish\\gupik\\gupik-pawie-oczko-endlera-ryba-4.jpg",
      "img_fish\\gupik\\gupik-pawie-oczko-endlera-ryba-5.jpg",
      "img_fish\\gupik\\gupik-pawie-oczko-gupiki-glupik-ryba-akwariowa-640x380.jpg",
      "img_fish\\gupik\\Guppy_coppia_gialla.jpg",
    ],
  },
};

function filter(biotop) {
  const cards = document.querySelectorAll(".fish-card");
  let visible = 0;

  cards.forEach((card) => {
    if (biotop === "all" || card.dataset.biotop === biotop) {
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  if (biotop === "all") {
    biotopeDescription.innerHTML =
      "<h3>Wszystkie biotopy</h3><p>Wybierz biotop z listy.</p>";
    emptyState.style.display = "none";
  } else {
    biotopeDescription.innerHTML = `<h3>${biotop}</h3><p>${biotopeDescriptions[biotop]}</p>`;
    emptyState.style.display = visible === 0 ? "" : "none";
  }

  modal.style.display = "none";
}

function highlight(biotop) {
  biotopeList.querySelectorAll("li").forEach((li) => {
    li.classList.toggle("active", li.dataset.biotop === biotop);
  });
}

filterBiotop.addEventListener("change", () => {
  const biotop = filterBiotop.value;
  highlight(biotop);
  filter(biotop);
});

biotopeList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const biotop = li.dataset.biotop;
  filterBiotop.value = biotop;

  highlight(biotop);
  filter(biotop);
});

// kliknięcie ryby → modal
document.addEventListener("click", (e) => {
  const card = e.target.closest(".fish-card");
  if (!card) return;

  const fishId = card.dataset.fish;
  const f = fishDetailsData[fishId];
  if (!f) return;

  modalName.textContent = f.name;
  modalLatin.textContent = f.latin;
  modalDesc.textContent = f.desc;

  currentGallery = f.gallery;
  currentIndex = 0;
  modalImg.src = currentGallery[currentIndex];

  modal.style.display = "flex";
});

// galeria
galleryPrev.addEventListener("click", () => {
  if (!currentGallery.length) return;
  currentIndex =
    (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  modalImg.src = currentGallery[currentIndex];
});

galleryNext.addEventListener("click", () => {
  if (!currentGallery.length) return;
  currentIndex = (currentIndex + 1) % currentGallery.length;
  modalImg.src = currentGallery[currentIndex];
});

// zamknięcie modala
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// start
filterBiotop.value = "Amazonia";
highlight("Amazonia");
filter("Amazonia");
