let searchConfig = {
  search: {
    profile: {
      artwork_sort_options: ["Recent", "Relevant", "High to low", "Low to high", "Limited editions"]
    },
    main_search: {
      artwork_filters: {
        theme: [
          "Abstraction", 
          "Landscape", 
          "Portraiture", 
          "Nature", 
          "Figures", 
          "Self-portraiture", 
          "Cityscapes", 
          "Interiors", 
          "Animals", 
          "Still Life", 
          "Seascapes", 
          "Everyday Life", 
          "Nudity", 
          "Identity and Representation", 
          "Religion and Spirituality", 
          "Surrealism", 
          "History and memory", 
          "Gender and Sexuality", 
          "Environmentalism", 
          "Pop Culture", 
          "Technology and Digital Culture", 
          "War and Conflict", "Fantasy", "Movement", 
          "Allegory and Symbolism", 
          "Tragedy and Trauma", 
          "Consumerism", 
          "Cartoon", 
          "Shape and Form", 
          "Color", 
          "Mythology and Folklore", 
          "Globalization and Migration", 
          "Satire and Irony", 
          "Science and Exploration", 
          "Human Rights and Social Justice", 
          "Other"
        ],
        emotion: [
          "Love", 
          "Happiness", 
          "Sadness", 
          "Freedom", 
          "Curiosity", 
          "Fear", 
          "Anger", 
          "Regret", 
          "Excitement", 
          "Anxiety", 
          "Empathy", 
          "Isolation", 
          "Frustration", 
          "Surprise", 
          "Nostalgia", 
          "Power", 
          "Peace & Harmony", 
          "Elegance", 
          "Transcendence", 
          "Abundance", 
          "Prosperity", 
          "Unknown"
        ],
        medium: [
          "Oil", 
          "Acrylic", 
          "Mixed Media", 
          "Watercolor", 
          "Gouache", 
          "Tempera", 
          "Pastel", 
          "Pen and Ink", 
          "Graphite Pencils", 
          "Colored Pencils", 
          "Spray Paint", 
          "Organic Paints", 
          "Chalk and Charcoal", 
          "Collage", 
          "Other"
        ],
        color: [
          "Blue", 
          "Red", 
          "Green", 
          "Yellow", 
          "Black", 
          "White", 
          "Orange", 
          "Purple", 
          "Gray", 
          "Brown", 
          "Pink", 
          "Gold"
        ],
        price: [
          { minPrice: 0, maxPrice: 1000, displayText: "Under $1000" }, 
          { minPrice: 1001, maxPrice: 5000, displayText: "$1,001 - $5,000" }, 
          { minPrice: 5001, maxPrice: 10000, displayText: "$5,001 - $10,000" }, 
          { minPrice: 10000, maxPrice: Number.MAX_SAFE_INTEGER, displayText: "Over $10,000" }
        ],
        size: [
          { unit: "cm", minWidth: "0", minHeight: "0", width: "47", height: "47", condition: "smaller", displayText: "Small" },
          { unit: "cm", minWidth: "47", minHeight: "47", width: "90", height: "90", condition: "smaller", displayText: "Medium" },
          { unit: "cm", minWidth: "90", minHeight: "90", width: "180", height: "180", condition: "smaller", displayText: "Large" },
          { unit: "cm", width: "180", height: "180", condition: "bigger", displayText: "Huge" }
        ]
      },
      artwork_order_by: ["Recent", "Relevant", "High to low", "Low to high", "Limited editions"],
      search_categories: {
        themes: [
          {
            category_item_name: "Abstraction", 
            category_item_image: "9e1e080d-1c24-4c37-6d25-0d7251a69f00", 
            category_item_link: "/search/abstraction"
          },
          {
            category_item_name: "Figures", 
            category_item_image: "336712f5-d59c-4cf7-3508-aa07aa99b000", 
            category_item_link: "/search/figures"
          },
          {
            category_item_name: "Landscape", 
            category_item_image: "c54e18a2-6e67-47a6-772a-d03f525fcf00", 
            category_item_link: "/search/landscape"
          },
          {
            category_item_name: "Pop Culture", 
            category_item_image: "fbb263a0-33d1-44c7-d62e-390ddccdec00", 
            category_item_link: "/search/pop-culture"
          },
        ],
        emotions: [
          {
            category_item_name: "Happiness", 
            category_item_image: "842a5927-6f6e-4b3c-73dd-f18c1cd78f00", 
            category_item_link: "/search/happiness"
          },
          {
            category_item_name: "Love", 
            category_item_image: "97586b81-c31b-45dc-11ae-70627f5a0f00", 
            category_item_link: "/search/love"
          },
          {
            category_item_name: "Freedom", 
            category_item_image: "37329b53-ee5c-41f7-3d04-e89af2275000", 
            category_item_link: "/search/freedom"
          },
          {
            category_item_name: "Curiosity", 
            category_item_image: "6cb5a994-cce4-4d8a-f5bc-e31389eb5e00", 
            category_item_link: "/search/curiosity"
          }
        ],
        colors: [
          {
            category_item_name: "Blue", 
            category_item_image: "9c40db5c-560e-4ce9-da2d-99389e6c9d00", 
            category_item_link: "/search/blue"
          },
          {
            category_item_name: "Green", 
            category_item_image: "55dad981-273e-493d-a088-f5388f91df00", 
            category_item_link: "/search/green"
          },
          {
            category_item_name: "Red", 
            category_item_image: "5aecd209-a90a-4514-2316-ccf4af540e00", 
            category_item_link: "/search/red"
          },
          {
            category_item_name: "Yellow", 
            category_item_image: "f8e7fd1e-082d-422c-4823-ae527df88000", 
            category_item_link: "/search/yellow"
          }
        ],
        size: [
          {
            category_item_name: "Under 45cm",  
            category_item_link: "/search/under-45cm"
          },
          {
            category_item_name: "45 cm - 90 cm",  
            category_item_link: "/search/45cm-90cm"
          },
          {
            category_item_name: "90 cm - 120 cm",  
            category_item_link: "/search/90cm-120cm"
          },
          {
            category_item_name: "Over 120cm",  
            category_item_link: "/search/over-120cm"
          }
        ],
        price: [
          {
            category_item_name: "Under $1000",  
            category_item_link: "/search/under-1000-dollars"
          },
          {
            category_item_name: "$1,001 - $5,000",  
            category_item_link: "/search/between-1001-and-5000-dollars"
          },
          {
            category_item_name: "$5,001 - $10,000",  
            category_item_link: "/search/between-5001-and-10000-dollars"
          },
          {
            category_item_name: "Over $10,000",  
            category_item_link: "/search/over-10000-dollars"
          }
        ]
      }
    } 
  }
};

export default searchConfig;