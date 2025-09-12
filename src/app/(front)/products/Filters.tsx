"use client";

import { productType } from "@/types/poductType";
import { Fragment, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import formatPrice from "@/lib/utils/formatPrice";
import { Brands } from "@/lib/constants/brands";
import converToLatin from "@/lib/utils/convertToLatin";
import { baseButton } from "@/styles/buttonStyles";
import categorySchemas from "@/types/categorySchemas";
import { Switch } from "@/components/ui/switch";

interface FiltersProps {
  updateProducts: React.Dispatch<React.SetStateAction<productType[] | null>>;
  enCategory: string;
  products: productType[] | null;
}

type priceRangeTuple = [number, number];

interface FiltersType {
  brands: string[];
  isAvailable: boolean;
  priceRange: priceRangeTuple;
  categoryFilters?: { [key: string]: any };
}

interface ToggleCategoryFilterState {
  [key: string]: boolean;
}

const baseFilters: FiltersType = {
  brands: [],
  isAvailable: false,
  priceRange: [0, 1000000000],
};

const Filters = ({ updateProducts, enCategory, products }: FiltersProps) => {
  const [toggleBrand, setToggleBrand] = useState<boolean>(false);
  const [filtersState, setFiltersState] = useState<FiltersType>(baseFilters);
  const [togglePriceRange, setTogglePriceRange] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [priceRangeError, setPriceRangeError] = useState<boolean>(false);
  const [toggleFilter, setToggleFilter] = useState<ToggleCategoryFilterState>(
    {}
  );

  const isFiltersActive =
    filtersState.brands.length > 0 ||
    filtersState.isAvailable ||
    filtersState.priceRange[0] > 0 ||
    filtersState.priceRange[1] < 1000000000 ||
    (filtersState.categoryFilters &&
      Object.values(filtersState.categoryFilters).some(
        (item) => item.length > 0
      ));

  const handleBrandChange = (brand: string): void => {
    if (filtersState.brands.includes(brand)) {
      setFiltersState({
        ...filtersState,
        brands: filtersState.brands.filter((item) => item !== brand),
      });
    } else {
      setFiltersState({
        ...filtersState,
        brands: [...filtersState.brands, brand],
      });
    }
  };

  const handleInStockChange = (): void => {
    setFiltersState({
      ...filtersState,
      isAvailable: !filtersState.isAvailable,
    });
  };

  const handlePriceRangeChange = (): void => {
    setPriceRangeError(false);
    let min = converToLatin(minPrice) || 0;
    let max = converToLatin(maxPrice) || 1000000000;
    if (+max < +min) {
      setPriceRangeError(true);
      return;
    }
    setFiltersState({ ...filtersState, priceRange: [+min, +max] });
  };

  const handleCategoryFilterChange = (
    filterSource: string,
    filterValue: string | number
  ): void => {
    if (filtersState?.categoryFilters![filterSource].includes(filterValue)) {
      setFiltersState({
        ...filtersState,
        categoryFilters: {
          ...filtersState.categoryFilters,
          [filterSource]: filtersState.categoryFilters![filterSource].filter(
            (item: string | number) => item !== filterValue
          ),
        },
      });
    } else {
      setFiltersState({
        ...filtersState,
        categoryFilters: {
          ...filtersState.categoryFilters,
          [filterSource]: [
            ...filtersState.categoryFilters![filterSource],
            filterValue,
          ],
        },
      });
    }
  };

  const handleCancelFilters = (): void => {
    if (enCategory !== "") {
      let initialCategoryFilterValues = {};
      Object.keys(categorySchemas[enCategory]).forEach((item) => {
        initialCategoryFilterValues = {
          ...initialCategoryFilterValues,
          [item]: [],
        };
      });
      setFiltersState({
        brands: [],
        isAvailable: false,
        priceRange: [0, 1000000000],
        categoryFilters: initialCategoryFilterValues,
      });
    } else {
      setFiltersState({
        brands: [],
        isAvailable: false,
        priceRange: [0, 1000000000],
        categoryFilters: {},
      });
    }
    setMinPrice("");
    setMaxPrice("");
    setToggleBrand(false);
    setTogglePriceRange(false);
    setPriceRangeError(false);
  };

  const applyFilters = (currentFilters: FiltersType): void => {
    const allProducts = products;
    let brandFilteredProducts: productType[] | null = [];
    let inStockFilteredProducts: productType[] | null = [];
    let priceRangeFilteredProducts: productType[] | null = [];

    // Function to apply brand filter
    const applyBrandFilter = (selectedBrands: string[]): void => {
      if (selectedBrands.length > 0) {
        selectedBrands.forEach((brand) => {
          brandFilteredProducts = allProducts!?.filter(
            (item) => item.brand === brand
          );
        });
      } else {
        brandFilteredProducts = products;
      }
    };

    // Function to apply inStock filter
    const applyInStockFilter = (inStock: boolean): void => {
      if (inStock) {
        inStockFilteredProducts = brandFilteredProducts!?.filter(
          (item) => item.inStock > 0
        );
      } else {
        inStockFilteredProducts = brandFilteredProducts;
      }
    };

    // Function to apply price range filter
    const applyPriceRangeFilter = (priceRange: priceRangeTuple): void => {
      priceRangeFilteredProducts = inStockFilteredProducts!?.filter(
        (item) =>
          +item.price - (+item.price * item.discountPercent) / 100 <
            priceRange[1] &&
          +item.price - (+item.price * item.discountPercent) / 100 >
            priceRange[0]
      );
    };

    // Executing the funtions (applying global filters)
    applyBrandFilter(currentFilters.brands);
    applyInStockFilter(currentFilters.isAvailable);
    applyPriceRangeFilter(currentFilters.priceRange);

    // Storing the the products after the global filters
    let globalFilteredProducts: productType[] | null =
      priceRangeFilteredProducts;

    // Applying category filters
    let finalFilteredProducts: productType[] | null = globalFilteredProducts;
    if (filtersState?.categoryFilters) {
      const categoryFiltersKeys = Object.keys(filtersState?.categoryFilters!);
      categoryFiltersKeys.forEach((filter) => {
        if (filtersState.categoryFilters![filter].length > 0) {
          filtersState.categoryFilters![filter].forEach(
            (item: string | number) => {
              finalFilteredProducts = globalFilteredProducts?.filter(
                (product) => product[filter as keyof productType] === item
              );
            }
          );
        }
      });
    }
    // Updating the products
    updateProducts(finalFilteredProducts || null);
  };

  const createInitialCategoryFilters = (): void => {
    if (enCategory !== "") {
      let initialCategoryFilterValues = {};
      Object.keys(categorySchemas[enCategory]).forEach((item) => {
        initialCategoryFilterValues = {
          ...initialCategoryFilterValues,
          [item]: [],
        };
      });
      setFiltersState({
        ...filtersState,
        categoryFilters: initialCategoryFilterValues,
      });

      let initialToggleFilter = {};
      Object.keys(categorySchemas[enCategory]).forEach(
        (item) =>
          (initialToggleFilter = { ...initialToggleFilter, [item]: false })
      );
      setToggleFilter(initialToggleFilter);
    }
  };

  useEffect(() => {
    createInitialCategoryFilters();
  }, []);

  useEffect(() => {
    applyFilters(filtersState);
  }, [filtersState]);

  return (
    <div className="border-2 dir=rtl py-4 rounded-lg">
      <div
        className={`flex items-center ${
          isFiltersActive ? "justify-between px-3" : "justify-center"
        }`}
      >
        {isFiltersActive && (
          <button
            className="flex flex-row items-center gap-1 cursor-pointer"
            onClick={handleCancelFilters}
          >
            <MdOutlineCancel size={19} />
            <span className="font-vazir font-bold text-[14px]">
              لغو فیلترها
            </span>
          </button>
        )}
        <h2 className="font-vazir font-bold text-[18px]">فیلترها</h2>
      </div>
      <div className="h-[1px] w-full bg-gray-300 mt-2" />
      <div
        className="flex justify-between px-2 py-3 items-center cursor-pointer hover:bg-gray-200"
        onClick={() => setToggleBrand(!toggleBrand)}
      >
        <div>
          {toggleBrand ? (
            <MdKeyboardArrowUp size={24} />
          ) : (
            <MdOutlineKeyboardArrowDown size={24} />
          )}
        </div>
        <p className="font-vazir text-[16px] font-bold">برند</p>
      </div>
      {toggleBrand && (
        <div className="max-h-[200px] overflow-auto">
          {Brands.map((item, index) => {
            return (
              <Fragment key={item + index}>
                <div
                  className="flex justify-between px-5 py-1 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleBrandChange(item)}
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={filtersState.brands.includes(item)}
                    onChange={() => handleBrandChange(item)}
                  />
                  <p>{item}</p>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
      <div
        className="flex justify-between px-2 py-3 hover:bg-gray-200 cursor-pointer"
        onClick={handleInStockChange}
      >
        <Switch
          className="cursor-pointer ml-1"
          checked={filtersState.isAvailable}
          onCheckedChange={handleInStockChange}
        />
        <p className="font-vazir text-[16px] font-bold">فقط کالاهای موجود</p>
      </div>
      <div
        className="flex justify-between px-2 py-3 items-center cursor-pointer hover:bg-gray-200"
        onClick={() => setTogglePriceRange(!togglePriceRange)}
      >
        <div>
          {togglePriceRange ? (
            <MdKeyboardArrowUp size={24} />
          ) : (
            <MdOutlineKeyboardArrowDown size={24} />
          )}
        </div>
        <p className="font-vazir text-[16px] font-bold">محدوده قیمت</p>
      </div>
      {togglePriceRange && (
        <div>
          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            <input
              type="text"
              className="font-vazir text-[16px] p-2 bg-gray-50 border-2 rounded-2xl text-center"
              placeholder={formatPrice("0")}
              value={minPrice}
              onChange={(e) => setMinPrice(formatPrice(e.target.value))}
            />
            <input
              type="text"
              className="font-vazir text-[16px] p-2 bg-gray-50 border-2 rounded-2xl text-center"
              placeholder={formatPrice("1000000000")}
              value={maxPrice}
              onChange={(e) => setMaxPrice(formatPrice(e.target.value))}
            />
            <button
              type="button"
              className={baseButton}
              onClick={handlePriceRangeChange}
            >
              اعمال
            </button>
            {priceRangeError && (
              <p className="font-vazir text-[14px] text-red-500 font-bold">
                ورودی نامعتبر
              </p>
            )}
          </div>
        </div>
      )}

      {filtersState?.categoryFilters &&
        Object.entries(filtersState.categoryFilters)?.map((entry) => {
          return (
            <Fragment key={entry[0]}>
              <div
                className="flex justify-between px-2 py-3 items-center cursor-pointer hover:bg-gray-200"
                onClick={() =>
                  setToggleFilter({
                    ...toggleFilter,
                    [entry[0]]: !toggleFilter[entry[0]],
                  })
                }
              >
                <div>
                  {toggleFilter[entry[0]] ? (
                    <MdKeyboardArrowUp size={24} />
                  ) : (
                    <MdOutlineKeyboardArrowDown size={24} />
                  )}
                </div>
                <p className="font-vazir text-[16px] font-bold">{entry[0]}</p>
              </div>
              {toggleFilter[entry[0]] && (
                <div className="max-h-[200px] overflow-auto">
                  {categorySchemas[enCategory][entry[0]]?.options?.map(
                    (item, index) => {
                      return (
                        <Fragment key={item + String(index)}>
                          <div
                            className="flex justify-between px-5 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() =>
                              handleCategoryFilterChange(entry[0], item)
                            }
                          >
                            <input
                              type="checkbox"
                              className="cursor-pointer"
                              checked={filtersState.categoryFilters![
                                entry[0]
                              ].includes(item)}
                              onChange={() =>
                                handleCategoryFilterChange(entry[0], item)
                              }
                            />
                            <p className="font-vazir text-[14px]">{item}</p>
                          </div>
                        </Fragment>
                      );
                    }
                  )}
                </div>
              )}
            </Fragment>
          );
        })}
    </div>
  );
};

export default Filters;
