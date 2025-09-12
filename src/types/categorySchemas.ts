interface FilterOption {
  type: "checkbox" | "select" | "range";
  options: string[] | number[];
  defaultValue: any;
}

interface CategorySchema {
  [key: string]: FilterOption;
}

const categorySchemas: Record<string, CategorySchema> = {
  laptop: {
    ram: {
      type: "checkbox",
      options: ["4 GB", "8 GB", "16 GB", "32 GB", "64 GB"],
      defaultValue: [],
    },
    cpu: {
      type: "checkbox",
      options: [
        "i3",
        "i5",
        "i7",
        "i9",
        "Ryzen 3",
        "Ryzen 5",
        "Ryzen 7",
        "Ryzen 9",
      ],
      defaultValue: [],
    },
    storage: {
      type: "checkbox",
      options: ["256GB", "512GB", "1TB", "2TB"],
      defaultValue: [],
    },
    GPU: {
      type: "checkbox",
      options: [
        "Intel",
        "RTX 3050",
        "RTX 3060",
        "RTX 3070",
        "RTX 3080",
        "RTX 4050",
        "RTX 4060",
        "RTX 4070",
        "RTX 4080",
      ],
      defaultValue: [],
    },
  },
  home_appliance: {
    نوع: {
      type: "checkbox",
      options: ["یخچال فریزر", "کولر", "تلویزیون", "ماشین لباسشویی", "پنکه", "سینک", "جاروبرقی"],
      defaultValue: []
    }
  },
  book: {
    موضوع: {
      type: "checkbox",
      options: [
        "رمان",
        "علمی",
        "تاریخی",
        "فانتزی",
        "غیرداستانی",
        "شعر و ادبیات",
        "کودکانه",
        "روانشناسی و توسعه فردی",
        "دینی و مذهبی",
      ],
      defaultValue: [],
    },
  },
  shoes: {
    نوع: {
      type: "checkbox",
      options: ["اسپرت", "مجلسی", "بوت", "کتانی"],
      defaultValue: []
    },
    سایز: {
      type: "checkbox",
      options: [37, 38, 39, 40, 41, 42, 43, 44],
      defaultValue: []
    }
  },
  mobile: {
    سیستم‌عامل: {
      type: "checkbox",
      options: ["Android", "iOS"],
      defaultValue: [],
    },
    حافظه‌داخلی: {
      type: "checkbox",
      options: ["64GB", "128GB", "256GB", "512GB", "1TB"],
      defaultValue: [],
    },
    RAM: {
      type: "checkbox",
      options: ["2 GB", "4 GB", "6 GB", "8 GB", "12 GB", "16 GB", "24 GB"],
      defaultValue: [],
    }
  },
  clothes: {
    نوع: {
      type: "checkbox",
      options: ["مردانه", "زنانه", "بچگانه"],
      defaultValue: [],
    },
    سایز: {
      type: "checkbox",
      options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      defaultValue: [],
    },
    جنس: {
      type: "checkbox",
      options: ["نخی", "پلی استر", "جین", "چرم", "کتان"],
      defaultValue: []
    }
  },
  stationery: {
    نوع‌محصول: {
      type: "checkbox",
      options: [
        "دفتر",
        "خودکار",
        "مداد",
        "پاک‌کن",
        "خط‌کش",
        "مداد رنگی",
        "ماژیک",
        "تراش",
      ],
      defaultValue: [],
    },
  },
  digital: {
    نوع: {
      type: "checkbox",
      options: ["هدست", "ساعت", "پاوربانک", "کابل"],
      defaultValue: []
    }
  },
};

export default categorySchemas;
