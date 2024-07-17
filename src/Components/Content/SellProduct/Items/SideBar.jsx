import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { SortingContext } from "../Sort/SortingContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { DataContext } from "../Sort/DataContext";

export default function SideBar({ initialCategory }) {
  const { setSortOption } = useContext(SortingContext);
  const [caratWeight, setCaratWeight] = useState([0.55, 1.75]);
  const { setApiUrl } = useContext(DataContext);
  const [filters, setFilters] = useState({
    Cut: "",
    Clarity: "",
    Color: "",
    Origin: "",
    Gender: "",
    Category: initialCategory === "products" ? "" : initialCategory || "",
    Material: "",
  });
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    const savedCaratWeight = localStorage.getItem("caratWeight");
    const savedApiUrl = localStorage.getItem("apiUrl");

    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }

    if (savedCaratWeight) {
      setCaratWeight(JSON.parse(savedCaratWeight));
    }

    if (savedApiUrl) {
      setApiUrl(savedApiUrl);
    } else {
      const query = buildQuery(
        savedCaratWeight ? JSON.parse(savedCaratWeight) : caratWeight,
        savedFilters ? JSON.parse(savedFilters) : filters
      );
      const initialApiUrl = `https://diamondstoreapi.azurewebsites.net/api/Products?${query}`;
      setApiUrl(initialApiUrl);
      localStorage.setItem("apiUrl", initialApiUrl);
    }

    isInitialLoad.current = false;
  }, [setApiUrl]);

  useEffect(() => {
    if (initialCategory) {
      const newCategory = initialCategory === "products" ? "" : initialCategory;

      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, Category: newCategory };
        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        return updatedFilters;
      });

      const newApiUrl = `https://diamondstoreapi.azurewebsites.net/api/Products?Category=${newCategory}`;
      setApiUrl(newApiUrl);
      localStorage.setItem("apiUrl", newApiUrl);
    }
  }, [initialCategory, setApiUrl]);

  const handleRadioChange = useCallback(
    (value) => {
      setSortOption(value);
    },
    [setSortOption]
  );

  const handleSliderChange = useCallback((newValue) => {
    setCaratWeight(newValue);
    localStorage.setItem("caratWeight", JSON.stringify(newValue));
  }, []);

  const handleSingleSelectChange = useCallback((groupName, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [groupName]: prevFilters[groupName] === value ? "" : value,
      };
      localStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  }, []);

  const buildQuery = (caratWeight, filters) => {
    const params = {
      MinCaratWeight: caratWeight[0],
      MaxCaratWeight: caratWeight[1],
      ...Object.fromEntries(
        Object.entries(filters)
          .filter(([_, value]) => value)
          .map(([key, value]) => [key, value])
      ),
    };
    return new URLSearchParams(params).toString();
  };

  useEffect(() => {
    if (!isInitialLoad.current) {
      const query = buildQuery(caratWeight, filters);
      const newApiUrl = `https://diamondstoreapi.azurewebsites.net/api/Products?${query}`;
      setApiUrl(newApiUrl);
      localStorage.setItem("apiUrl", newApiUrl);
    }
  }, [caratWeight, filters, setApiUrl]);

  return (
    <div className="relative w-[20%] border-t-[0.1em] border-t-black border-opacity-10">
      <div className={`w-full`}>
        <div className="flex flex-col justify-center items-start">
          <div className="text uppercase mt-5">sort by</div>
          {radioOptions.map((title, index) => (
            <RadioCheck
              key={index}
              title={title}
              index={index}
              onChange={handleRadioChange}
            />
          ))}
          <div className="w-full h-26 mt-5">
            <div className="text uppercase mb-5">Carat weight</div>
            <div className="">
              <Slider
                range
                min={0.55}
                max={1.75}
                step={0.01}
                defaultValue={0.75}
                onChange={handleSliderChange}
                value={caratWeight}
                allowCross={false}
                trackStyle={[{ backgroundColor: "black", height: "8px" }]}
                handleStyle={[
                  {
                    borderColor: "#54cc26",
                    height: 18,
                    width: 18,
                    backgroundColor: "green",
                    opacity: 100,
                  },
                  {
                    borderColor: "#54cc26",
                    height: 18,
                    width: 18,
                    backgroundColor: "green",
                    opacity: 100,
                  },
                ]}
                railStyle={{ backgroundColor: "green", height: "8px" }}
              />
            </div>
            <div className="mt-5">
              Carat Weight: {caratWeight[0]} - {caratWeight[1]}
            </div>
          </div>
          <div className="text uppercase mt-5">Cut</div>
          {cutOptions.map((title, index) => (
            <SingleSelect
              key={index}
              title={title}
              index={index}
              groupName="Cut"
              onChange={handleSingleSelectChange}
              isChecked={filters.Cut === title}
            />
          ))}
          <div className="text uppercase mt-5">Clarity</div>
          {ClarityOptions.map((title, index) => (
            <SingleSelect
              key={index}
              title={title}
              index={index}
              groupName="Clarity"
              onChange={handleSingleSelectChange}
              isChecked={filters.Clarity === title}
            />
          ))}
          <div className="text uppercase mt-5">Color</div>
          {ColorOptions.map((title, index) => (
            <SingleSelect
              key={index}
              title={title}
              index={index}
              groupName="Color"
              onChange={handleSingleSelectChange}
              isChecked={filters.Color === title}
            />
          ))}
          <div className="text uppercase mt-5">Origin</div>
          {OriginOptions.map((title, index) => (
            <SingleSelect
              key={index}
              title={title}
              index={index}
              groupName="Origin"
              onChange={handleSingleSelectChange}
              isChecked={filters.Origin === title}
            />
          ))}
          <div className="text uppercase mt-5">Select for</div>
          {selectForOptions.map((title, index) => (
            <SingleSelect
              key={index}
              title={title}
              index={index}
              groupName="Gender"
              onChange={handleSingleSelectChange}
              isChecked={filters.Gender === title}
            />
          ))}
          <div className="text uppercase mt-5">Category</div>
          {categoryOptions.map((title, index) => (
            <SingleSelect
              key={index}
              title={title}
              index={index}
              groupName="Category"
              onChange={handleSingleSelectChange}
              isChecked={filters.Category === title}
            />
          ))}
          <div className="text uppercase mt-5">Material</div>
          {metalOptions.map((title, index) => (
            <SingleSelect
              key={index}
              title={title}
              index={index}
              groupName="Material"
              onChange={handleSingleSelectChange}
              isChecked={filters.Material === title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const RadioCheck = ({ title, index, onChange }) => {
  const inputId = `radio${index}`;
  return (
    <div className="flex w-full mt-3">
      <label htmlFor={inputId} className="radio-label">
        <input
          type="radio"
          id={inputId}
          name="radio"
          className="radio-input"
          onChange={() => onChange(title)}
        />
        <div className="custom-radio"></div>
        <p className="uppercase hover:underline text-[0.9em] ml-2">{title}</p>
      </label>
    </div>
  );
};

const SingleSelect = ({
  title,
  index,
  groupName,
  onChange,
  isChecked = false,
}) => {
  const inputId = `${groupName}-${index}`;
  return (
    <div className="flex w-full mt-3">
      <label htmlFor={inputId} className="radio-label">
        <input
          type="checkbox"
          id={inputId}
          name={groupName}
          className="radio-input"
          onChange={() => onChange(groupName, title)}
          checked={isChecked}
        />
        <div className="custom-radio"></div>
        <p className="uppercase text-[0.9em] hover:underline ml-2">{title}</p>
      </label>
    </div>
  );
};

const radioOptions = ["price low to high", "price high to low", "recommended"];
const cutOptions = ["Excellent", "Very Good", "Good"];
const ClarityOptions = [
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "I1",
  "I2",
];
const ColorOptions = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const OriginOptions = ["Synthetic", "Natural"];
const categoryOptions = ["Rings", "Earrings", "Bracelets", "Necklaces"];
const selectForOptions = ["Female", "Male", "Unisex"];
const metalOptions = [
  "Gold",
  "Silver",
  "Platinum",
  "Palladium",
  "Titanium",
  "White Gold",
];
