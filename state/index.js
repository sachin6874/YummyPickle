import { atom } from "recoil";

let userState = atom({
  key: "userState",
  default: {},
});

let productsState = atom({
  key: "productsState",
  default: {
    MANGO_PICKLE: {
      name: "Mango Pickle",
      slug: "MANGO_PICKLE",
      description:
        "It is a indian pickle variety made with raw unripe green mangoes, pickling spices and oil.",
      image: "kach_aam.png",
      price: 150,
      rating: 5,
    },
    GINGER_PICKLE: {
      name: "Ginger Pickle",
      slug: "GINGER_PICKLE",
      description:
        "It is made from sweet, thinly sliced ginger that has been marinated in a solution of sugar and vinegar.",
      image: "adrak-ka-achaar.jpg",
      price: 200,
      rating: 3,
    },
    TOMATO_PICKLE: {
      name: "Tomato Pickle",
      slug: "TOMATO_PICKLE",
      description:
        "Tomato Pickle is made with ripe season tomatoes, spices and oil.",
      image: "tamatar-ka-achaar.jpg",
      price: 155,
      rating: 2,
    },
    RED_CHILLI_PICKLE: {
      name: "Red Chilli Pickle",
      slug: "RED_CHILLI_PICKLE",
      description:
        "Lal Mirch Ka Achar (Stuffed Red Chilli Pickle) is a traditional hot, spicy, and tangy North Indian pickle made using thick red chillies and Indian pickling spices.",
      image: "red-chilli-ka-achaar.jpg",
      price: 185,
      rating: 4,
    },
    LEMON_CHILLI_PICKLE: {
      name: "Lemon Chilli Pickle",
      slug: "LEMON_CHILLI_PICKLE",
      description:
        "Nimbu Mirch Ka Achar uses the common ingredient of nimbu or lime and green chillies for a tangy spicy pickle that will add much flavor to your meals.",
      image: "nimboo-ka-achaar.jpg",
      price: 200,
      rating: 5,
    },
    AAM_CHUNDA_PICKLE: {
      name: "Aam Chunda Pickle",
      slug: "AAM_CHUNDA_PICKLE",
      description:
        "Aam chunda is a Gujarati-style spicy, sweet and sour mango pickle (preserve) made using green raw mangoes. This vegan and gluten-free pickle is a perfect accompaniment to your summer Indian meals.",
      image: "aam-chunda-achaar.jpg",
      price: 135,
      rating: 3,
    },
    GREEN_CHILLI_PICKLE: {
      name: "Green Chilli Pickle",
      slug: "GREEN_CHILLI_PICKLE",
      description:
        "Spicy, tangy, and loaded with flavor, Green Chilli Pickle or Hari Mirch ka Achar is a delicious North Indian style pickle recipe where fresh green chilies are pickled with mustard seeds and lemon juice. This pickle goes very well with any Indian meals.",
      image: "green-chilli-pickle.png",
      price: 115,
      rating: 1,
    },
    KATHAL_KA_ACHAAR: {
      name: "Kathal Ka Achaar",
      slug: "KATHAL_KA_ACHAAR",
      description:
        "Jackfruit is an uncommon vegetable, which has found its way into the kitchen and made everyone very happy. Not only can you make a wonderful dish out of Jackfruit, but also an amazing pickle. ",
      image: "kathal-ka-achaar.jpg",
      price: 230,
      rating: 3,
    },
    SAJAN_KA_ACHAAR: {
      name: "Sajan Ka Achaar",
      slug: "SAJAN_KA_ACHAAR",
      description:
        "This is another unusual type of Pickle which is prepared with Drumsticks. As different it may sound, it tastes nothing like anything you’d ever expect it to taste like. Surprise yourself with this. Also, Drumsticks are known to be very healthy for you.",
      image: "sajan-ka-achaar.jpg",
      price: 320,
      rating: 3,
    },
    SUKHI_DAAL_KA_ACHAAR: {
      name: "Sukhi Dal Ka Achar",
      slug: "SUKHI_DAAL_KA_ACHAAR",
      description:
        "This is a wonderful and unique category of pickle, which is prepared with Lentils only. The Lentils are roasted and pickled and sun-dried for this ultimate flavoursome preparation. There isn’t anything else like this dish, and it will surely impress you with an attack of flavours inside your mouth.",
      image: "sukhi-dal-ka-achaar.jpg",
      price: 145,
      rating: 3,
    },
    ONION_PICKLE: {
      name: "Onion Pickle",
      slug: "ONION_PICKLE",
      description:
        "Onions are an important and irreplaceable part of the Indian cuisine. So we have the very special and loved Pyaaz ka Achaar which is prepared using Onions as the main ingredient. The onions used for this are quite small, and the Pickle is finally stored in glass jars.",
      image: "pyaaz-ka-achaar.jpg",
      price: 180,
      rating: 4,
    },
    COCONUT_PICKLE: {
      name: "Coconut Red Chilli Pickle",
      slug: "COCONUT_PICKLE",
      description:
        "It is known to everyone who has lived even for a little bit of time in South India or belongs from there. Grated coconut is used along with Red Chillies and Jeera for the best combination of flavours. It is mostly served as a side against most South Indian meals.",
      image: "nariyal-ka-achaar.jpg",
      price: 115,
      rating: 4,
    },
    GARLIC_PICKLE: {
      name: "Garlic Pickle",
      slug: "GARLIC_PICKLE",
      description:
        "We all love the flavour of Garlic in our dishes, so why not make an entire dish out of just Garlic. Lasoon ka Achaar is precisely just that dish. It is prepared using cut pieces of Garlic. One may use a Garlic Paste too. This is a very common type of Achaar in North India.",
      image: "lasoon-ka-achaar.jpg",
      price: 350,
      rating: 4,
    },
    GAJAR_KA_ACHAAR: {
      name: "Gajar Ka Achaar",
      slug: "GAJAR_KA_ACHAAR",
      description:
        "Spicy, tangy, and loaded with flavor, Green Chilli Pickle or Hari Mirch ka Achar is a delicious North Indian style pickle recipe where fresh green chilies are pickled with mustard seeds and lemon juice. This pickle goes very well with any Indian meals.",
      image: "gajaar-ka-achaar.jpg",
      price: 100,
      rating: 3,
    },
    SABZI_KA_ACHAAR: {
      name: "Sabzi Ka Achaar",
      slug: "SABZI_KA_ACHAAR",
      description:
        "This is known to be a Pickle which is prepared using a mix of vegetables such as Raw Mango, Carrots, Tomato and even Cauliflower. It is an extremely delectable Pickle which is a total Powerhouse of flavours.",
      image: "sabzi-ka-achaar.png",
      price: 100,
      rating: 2,
    },
    SWEET_MANGO_PICKLE: {
      name: "Sweet Mango Pickle",
      slug: "SWEET_MANGO_PICKLE",
      description:
        "This is a similar kind of pickle as that of raw mango pickle. Except, the mango used in this preparation is the sweet Mango, thus this pickle is a quite sweet Pickle. The pickle has sort of a sweet and salty taste, which is a delightful combination",
      image: "mithey-aam-kaachaar.jpg",
      price: 130,
      rating: 4,
    },
    IMLI_KA_ACHAAR: {
      name: "Imli Ka Achaar",
      slug: "IMLI_KA_ACHAAR",
      description:
        "This delectable pickle is prepared from the extremely sour Tamarind, which is known to be the mother of all sour fruits. Although it is a little difficult to prepare this kind of Pickle, all that hard work is worth it. The end results are beyond expectations for this one.",
      image: "imli-ka-achaar.jpg",
      price: 230,
      rating: 4,
    },
    AAMLE_KA_ACHAAR: {
      name: "Aamle Ka Achaar",
      slug: "AAMLE_KA_ACHAAR",
      description:
        "This is a type of pickle where Amla otherwise commonly known as Gooseberry is used in the preparation. It is a common item in North Indian households and is best served with Parathas.",
      image: "aamle-ka-achaar.jpg",
      price:130,
      rating: 3,
    },
    CUCUMBER_PICKLE: {
      name: "Cucumber Pickle",
      slug: "CUCUMBER_PICKLE",
      description:
        "Cucumber is known to be a vegetable which helps in cooling down the human body and helps to fight indigestion. The Kheere ka Achaar is made using pickled Cucumber slices which are not only tasty but very healthy too",
      image: "kheere-ka-achaar.jpg",
      price: 100,
      rating: 3,
    },
    BHINDI_KA_ACHAAR: {
      name: "Bhindi Ka Achaar",
      slug: "BHINDI_KA_ACHAAR",
      description:
        "Okra or Ladyfinger is known to everyone as a common vegetable which is often cooked for dinner. But did you know that it makes for a great element for a really tasty Achaar? Try it, if you haven’t tasted it already",
      image: "bhindi-ka-achaar.jpg",
      price: 80,
      rating: 3,
    },
    KHAJUR_KA_ACHAAR: {
      name: "Khajur Ka Achaar",
      slug: "KHAJUR_KA_ACHAAR",
      description:
        "Khajur or Date Palm is a common Achaar element that you’ll find in common Indian households.",
      image: "khajur-ka-achaar.jpg",
      price: 170,
      rating: 3,
    },
  },
});

let cartState = atom({
  key: "cartState",
  default: {},
});

export { userState, productsState, cartState };
